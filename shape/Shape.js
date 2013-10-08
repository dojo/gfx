define(["../_base", "dojo/_base/lang", "dojo/_base/declare", "dojo/_base/sniff",
	"dojo/_base/array", "dojo/_base/Color", "../matrix", "./_EventsProcessing" ],
	function(g, lang, declare, has, arr, Color, matrixLib, EventsProcessing){

		var registry;

		function getRegistry(){
			if(registry === undefined){
				if(has("gfxRegistry")){
					registry = require("gfx/registry");
				}else{
					registry = null;
				}
			}
			return registry;
		}

		return declare([EventsProcessing], {
			// summary:
			//		a Shape object, which knows how to apply
			//		graphical attributes and transformations

			constructor: function(rawShape, rawNode){
				// summary: Creates a new shape.
				// rawShape: Object
				//		The properties of the shape.

				// shape: Object
				//		an abstract shape object
				//		(see gfx.defaultPath,
				//		gfx.defaultPolyline,
				//		gfx.defaultRect,
				//		gfx.defaultEllipse,
				//		gfx.defaultCircle,
				//		gfx.defaultLine,
				//		or gfx.defaultImage)
				this.shape = this.shape ? lang.clone(this.shape) : null;

				// matrix: gfx/matrix.Matrix2D
				//		a transformation matrix
				this.matrix = null;

				// fillStyle: gfx.Fill
				//		a fill object
				//		(see gfx.defaultLinearGradient,
				//		gfx.defaultRadialGradient,
				//		gfx.defaultPattern,
				//		or dojo/Color)
				this.fillStyle = null;

				// strokeStyle: gfx.Stroke
				//		a stroke object
				//		(see gfx.defaultStroke)
				this.strokeStyle = null;

				// bbox: gfx.Rectangle
				//		a bounding box of this shape
				//		(see gfx.defaultRect)
				this.bbox = null;

				// virtual group structure

				// parent: Object
				//		a parent or null
				//		(see gfx/shape.Surface,
				//		or gfx.Group)
				this.parent = null;

				// parentMatrix: gfx/matrix.Matrix2D
				//		a transformation matrix inherited from the parent
				this.parentMatrix = null;

				if(has("gfxRegistry")){
					var uid = getRegistry().register(this);
					this.getUID = function(){
						return uid;
					}
				}

				// rawNode: Node
				//		underlying graphics-renderer-specific implementation object (if applicable)
				this.rawNode = rawNode || this.createRawNode();

				if(rawShape){
					this.setShape(rawShape);
				}
			},

			createRawNode: function(){
				// summary:
				//		Creates the underlying DOM node for this shape.
				// description:
				//		This method should be overidden by renderers that actually represent shapes
				//		using DOM nodes (like SVG).
				return null;
			},

			destroy: function(){
				// summary:
				//		Releases all internal resources owned by this shape. Once this method has been called,
				//		the instance is considered destroyed and should not be used anymore.
				if(has("gfxRegistry")){
					getRegistry().dispose(this);
				}
				if(this.rawNode && "__gfxObject__" in this.rawNode){
					this.rawNode.__gfxObject__ = null;
				}
				this.rawNode = null;
			},

			// trivial getters

			getNode: function(){
				// summary:
				//		Different graphics rendering subsystems implement shapes in different ways.  This
				//		method provides access to the underlying graphics subsystem object.  Clients calling this
				//		method and using the return value must be careful not to try sharing or using the underlying node
				//		in a general way across renderer implementation.
				//		Returns the underlying graphics Node, or null if no underlying graphics node is used by this shape.
				return this.rawNode; // Node
			},
			getShape: function(){
				// summary:
				//		returns the current Shape object or null
				//		(see gfx.defaultPath,
				//		gfx.defaultPolyline,
				//		gfx.defaultRect,
				//		gfx.defaultEllipse,
				//		gfx.defaultCircle,
				//		gfx.defaultLine,
				//		or gfx.defaultImage)
				return this.shape; // Object
			},
			getTransform: function(){
				// summary:
				//		Returns the current transformation matrix applied to this Shape or null
				return this.matrix;	// gfx/matrix.Matrix2D
			},
			getFill: function(){
				// summary:
				//		Returns the current fill object or null
				//		(see gfx.defaultLinearGradient,
				//		gfx.defaultRadialGradient,
				//		gfx.defaultPattern,
				//		or dojo/Color)
				return this.fillStyle;	// Object
			},
			getStroke: function(){
				// summary:
				//		Returns the current stroke object or null
				//		(see gfx.defaultStroke)
				return this.strokeStyle;	// Object
			},
			getParent: function(){
				// summary:
				//		Returns the parent Shape, Group or null if this Shape is unparented.
				//		(see gfx/shape.Surface,
				//		or gfx.Group)
				return this.parent;	// Object
			},
			getBoundingBox: function(){
				// summary:
				//		Returns the bounding box Rectangle for this shape or null if a BoundingBox cannot be
				//		calculated for the shape on the current renderer or for shapes with no geometric area (points).
				//		A bounding box is a rectangular geometric region
				//		defining the X and Y extent of the shape.
				//		(see gfx.defaultRect)
				//		Note that this method returns a direct reference to the attribute of this instance. Therefore you should
				//		not modify its value directly but clone it instead.
				return this.bbox;	// gfx.Rectangle
			},
			getTransformedBoundingBox: function(){
				// summary:
				//		returns an array of four points or null
				//		four points represent four corners of the untransformed bounding box
				var b = this.getBoundingBox();
				if(!b){
					return null;	// null
				}
				var m = this._getRealMatrix(),
					gm = matrixLib;
				return [	// Array
					gm.multiplyPoint(m, b.x, b.y),
					gm.multiplyPoint(m, b.x + b.width, b.y),
					gm.multiplyPoint(m, b.x + b.width, b.y + b.height),
					gm.multiplyPoint(m, b.x, b.y + b.height)
				];
			},
			getEventSource: function(){
				// summary:
				//		returns a Node, which is used as
				//		a source of events for this shape

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				return this.rawNode;	// Node
			},

			// empty settings

			setClip: function(clip){
				// summary:
				//		sets the clipping area of this shape.
				// description:
				//		The clipping area defines the shape area that will be effectively visible. Everything that
				//		would be drawn outside of the clipping area will not be rendered.
				//		The possible clipping area types are rectangle, ellipse, polyline and path.
				//		The clip parameter defines the clipping area geometry, and should be an object with the following properties:
				//
				//		- {x:Number, y:Number, width:Number, height:Number} for rectangular clip
				//		- {cx:Number, cy:Number, rx:Number, ry:Number} for ellipse clip
				//		- {points:Array} for polyline clip
				//		- {d:String} for a path clip.
				//
				//		The clip geometry coordinates are expressed in the coordinate system used to draw the shape. In other
				//		words, the clipping area is defined in the shape parent coordinate system and the shape transform is automatically applied.
				// example:
				//		The following example shows how to clip a gfx image with all the possible clip geometry: a rectangle,
				//		an ellipse, a circle (using the ellipse geometry), a polyline and a path:
				//
				//	|	surface.createImage({src:img, width:200,height:200}).setClip({x:10,y:10,width:50,height:50});
				//	|	surface.createImage({src:img, x:100,y:50,width:200,height:200}).setClip({cx:200,cy:100,rx:20,ry:30});
				//	|	surface.createImage({src:img, x:0,y:350,width:200,height:200}).setClip({cx:100,cy:425,rx:60,ry:60});
				//	|	surface.createImage({src:img, x:300,y:0,width:200,height:200}).setClip({points:[350,0,450,50,380,130,300,110]});
				//	|	surface.createImage({src:img, x:300,y:350,width:200,height:200}).setClip({d:"M 350,350 C314,414 317,557 373,450.0000 z"});

				// clip: Object
				//		an object that defines the clipping geometry, or null to remove clip.

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				this.clip = clip;
			},

			getClip: function(){
				return this.clip;
			},

			setShape: function(shape){
				// summary:
				//		sets a shape object
				//		(the default implementation simply ignores it)
				// shape: Object
				//		a shape object
				//		(see gfx.defaultPath,
				//		gfx.defaultPolyline,
				//		gfx.defaultRect,
				//		gfx.defaultEllipse,
				//		gfx.defaultCircle,
				//		gfx.defaultLine,
				//		or gfx.defaultImage)

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				this.shape = g.makeParameters(this.shape, shape);
				this.bbox = null;
				return this;	// self
			},
			setFill: function(fill){
				// summary:
				//		sets a fill object
				//		(the default implementation simply ignores it)
				// fill: Object
				//		a fill object
				//		(see gfx.defaultLinearGradient,
				//		gfx.defaultRadialGradient,
				//		gfx.defaultPattern,
				//		or dojo/_base/Color)

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				if(!fill){
					// don't fill
					this.fillStyle = null;
					return this;	// self
				}
				var f = null;
				if(typeof(fill) == "object" && "type" in fill){
					// gradient or pattern
					switch(fill.type){
						case "linear":
							f = g.makeParameters(g.defaultLinearGradient, fill);
							break;
						case "radial":
							f = g.makeParameters(g.defaultRadialGradient, fill);
							break;
						case "pattern":
							f = g.makeParameters(g.defaultPattern, fill);
							break;
					}
				}else{
					// color object
					f = g.normalizeColor(fill);
				}
				this.fillStyle = f;
				return this;	// self
			},
			setStroke: function(stroke){
				// summary:
				//		sets a stroke object
				//		(the default implementation simply ignores it)
				// stroke: Object
				//		a stroke object
				//		(see gfx.defaultStroke)

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				if(!stroke){
					// don't stroke
					this.strokeStyle = null;
					return this;	// self
				}
				// normalize the stroke
				if(typeof stroke == "string" || lang.isArray(stroke) || stroke instanceof Color){
					stroke = {color: stroke};
				}
				var s = this.strokeStyle = g.makeParameters(g.defaultStroke, stroke);
				s.color = g.normalizeColor(s.color);
				return this;	// self
			},
			setTransform: function(matrix){
				// summary:
				//		sets a transformation matrix
				// matrix: gfx/matrix.Matrix2D
				//		a matrix or a matrix-like object
				//		(see an argument of gfx/matrix.Matrix2D
				//		constructor for a list of acceptable arguments)

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				this.matrix = matrixLib.clone(matrix ? matrixLib.normalize(matrix) : matrixLib.identity);
				return this._applyTransform();	// self
			},

			_applyTransform: function(){
				// summary:
				//		physically sets a matrix

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				return this;	// self
			},

			// z-index

			moveToFront: function(){
				// summary:
				//		moves a shape to front of its parent's list of shapes
				var p = this.getParent();
				if(p){
					p._moveChildToFront(this);
					this._moveToFront();	// execute renderer-specific action
				}
				return this;	// self
			},
			moveToBack: function(){
				// summary:
				//		moves a shape to back of its parent's list of shapes
				var p = this.getParent();
				if(p){
					p._moveChildToBack(this);
					this._moveToBack();	// execute renderer-specific action
				}
				return this;
			},
			_moveToFront: function(){
				// summary:
				//		renderer-specific hook, see gfx/shape.Shape.moveToFront()

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
			},
			_moveToBack: function(){
				// summary:
				//		renderer-specific hook, see gfx/shape.Shape.moveToFront()

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
			},

			// apply left & right transformation

			applyRightTransform: function(matrix){
				// summary:
				//		multiplies the existing matrix with an argument on right side
				//		(this.matrix * matrix)
				// matrix: gfx/matrix.Matrix2D
				//		a matrix or a matrix-like object
				//		(see an argument of gfx/matrix.Matrix2D
				//		constructor for a list of acceptable arguments)
				return matrix ? this.setTransform([this.matrix, matrix]) : this;	// self
			},
			applyLeftTransform: function(matrix){
				// summary:
				//		multiplies the existing matrix with an argument on left side
				//		(matrix * this.matrix)
				// matrix: gfx/matrix.Matrix2D
				//		a matrix or a matrix-like object
				//		(see an argument of gfx/matrix.Matrix2D
				//		constructor for a list of acceptable arguments)
				return matrix ? this.setTransform([matrix, this.matrix]) : this;	// self
			},
			applyTransform: function(matrix){
				// summary:
				//		a shortcut for gfx/shape.Shape.applyRightTransform
				// matrix: gfx/matrix.Matrix2D
				//		a matrix or a matrix-like object
				//		(see an argument of gfx/matrix.Matrix2D
				//		constructor for a list of acceptable arguments)
				return matrix ? this.setTransform([this.matrix, matrix]) : this;	// self
			},

			// virtual group methods

			removeShape: function(silently){
				// summary:
				//		removes the shape from its parent's list of shapes
				// silently: Boolean
				//		if true, do not redraw a picture yet
				if(this.parent){
					this.parent.remove(this, silently);
				}
				return this;	// self
			},
			_setParent: function(parent, matrix){
				// summary:
				//		sets a parent
				// parent: Object
				//		a parent or null
				//		(see gfx/shape.Surface,
				//		or gfx.Group)
				// matrix: gfx/matrix.Matrix2D
				//		a 2D matrix or a matrix-like object
				this.parent = parent;
				return this._updateParentMatrix(matrix);	// self
			},
			_updateParentMatrix: function(matrix){
				// summary:
				//		updates the parent matrix with new matrix
				// matrix: gfx/Matrix2D
				//		a 2D matrix or a matrix-like object
				this.parentMatrix = matrix ? matrixLib.clone(matrix) : null;
				return this._applyTransform();	// self
			},
			_getRealMatrix: function(){
				// summary:
				//		returns the cumulative ('real') transformation matrix
				//		by combining the shape's matrix with its parent's matrix
				var m = this.matrix;
				var p = this.parent;
				while(p){
					if(p.matrix){
						m = matrixLib.multiply(p.matrix, m);
					}
					p = p.parent;
				}
				return m;	// gfx/matrix.Matrix2D
			}
		});
	});