define(["../_base", "dojo/_base/lang", "dcl/dcl", "dojo/_base/sniff",
	"dojo/_base/array", "dojo/_base/Color", "../matrix", "./_EventsProcessing",
	"dui/Stateful" ],
	function(g, lang, dcl, has, arr, Color, matrixLib, EventsProcessing, Stateful){

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

		return dcl([EventsProcessing, Stateful], {
			// summary:
			//		a Shape object, which knows how to apply
			//		graphical attributes and transformations

			// shape: Object
			//		an abstract shape object
			//		(see gfx.defaultPath,
			//		gfx.defaultPolyline,
			//		gfx.defaultRect,
			//		gfx.defaultEllipse,
			//		gfx.defaultCircle,
			//		gfx.defaultLine,
			//		or gfx.defaultImage)
			shape: null,

			// fill: gfx.Fill
			//		a fill object
			//		(see gfx.defaultLinearGradient,
			//		gfx.defaultRadialGradient,
			//		gfx.defaultPattern,
			//		or dojo/Color)
			fill: null,

			// stroke: gfx.Stroke
			//		a stroke object
			//		(see gfx.defaultStroke)
			stroke: null,

			// transform: gfx/matrix.Matrix2D
			//		a transformation matrix
			transform: null,

			// clip: Object
			//		an object that defines the clipping geometry, or null to remove clip.
			clip: null,

			constructor: function(rawShape, rawNode){
				// summary: Creates a new shape.
				// rawShape: Object
				//		The properties of the shape.

			    var shape = this._get("shape");
			    if(shape){
					this._set("shape", lang.clone(shape));
				}

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

				this.shape = rawShape;
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

			_setClipAttr: function(clip){
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
				//	|	surface.createImage({src:img, width:200,height:200}).clip = {x:10,y:10,width:50,height:50};
				//	|	surface.createImage({src:img, x:100,y:50,width:200,height:200}).clip = {cx:200,cy:100,rx:20,ry:30};
				//	|	surface.createImage({src:img, x:0,y:350,width:200,height:200}).clip = {cx:100,cy:425,rx:60,ry:60};
				//	|	surface.createImage({src:img, x:300,y:0,width:200,height:200}).clip = {points:[350,0,450,50,380,130,300,110]};
				//	|	surface.createImage({src:img, x:300,y:350,width:200,height:200}).clip = {d:"M 350,350 C314,414 317,557 373,450.0000 z"};

				// clip: Object
				//		an object that defines the clipping geometry, or null to remove clip.

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				this._set("clip", clip);
			},

			_setShapeAttr: function(shape){
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
				this._set("shape", g.makeParameters(this.shape, shape));
				this.bbox = null;
			},
			_setFillAttr: function(fill){
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
					this._set("fill", null);
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
				this._set("fill", f);
			},
			_setStrokeAttr: function(stroke){
				// summary:
				//		sets a stroke object
				//		(the default implementation simply ignores it)
				// stroke: Object
				//		a stroke object
				//		(see gfx.defaultStroke)

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				if(!stroke){
					// don't stroke
					this._set("stroke", null);
					return this;	// self
				}
				// normalize the stroke
				if(typeof stroke == "string" || lang.isArray(stroke) || stroke instanceof Color){
					stroke = {color: stroke};
				}
				var s = g.makeParameters(g.defaultStroke, stroke);
				s.color = g.normalizeColor(s.color);
				this._set("stroke", s);
			},
			_setTransformAttr: function(matrix){
				// summary:
				//		sets a transformation matrix
				// matrix: gfx/matrix.Matrix2D
				//		a matrix or a matrix-like object
				//		(see an argument of gfx/matrix.Matrix2D
				//		constructor for a list of acceptable arguments)

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
				this._set("transform", matrixLib.clone(matrix ? matrixLib.normalize(matrix) : matrixLib.identity));
				this._applyTransform();
			},

			_applyTransform: function(){
				// summary:
				//		physically sets a matrix

				// COULD BE RE-IMPLEMENTED BY THE RENDERER!
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
				//		(this.transform * matrix)
				// matrix: gfx/matrix.Matrix2D
				//		a matrix or a matrix-like object
				//		(see an argument of gfx/matrix.Matrix2D
				//		constructor for a list of acceptable arguments)
				if(matrix){
					this.transform = [this.transform, matrix];
				}
				return this;
			},
			applyLeftTransform: function(matrix){
				// summary:
				//		multiplies the existing matrix with an argument on left side
				//		(matrix * this.transform)
				// matrix: gfx/matrix.Matrix2D
				//		a matrix or a matrix-like object
				//		(see an argument of gfx/matrix.Matrix2D
				//		constructor for a list of acceptable arguments)
				if(matrix){
					this.transform = [matrix, this.transform];
				}
				return this;
			},
			applyTransform: function(matrix){
				// summary:
				//		a shortcut for gfx/shape.Shape.applyRightTransform
				// matrix: gfx/matrix.Matrix2D
				//		a matrix or a matrix-like object
				//		(see an argument of gfx/matrix.Matrix2D
				//		constructor for a list of acceptable arguments)
				if(matrix){
					this.transform = [this.transform, matrix];
				}
				return this;
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
				var m = this.transform;
				var p = this.parent;
				while(p){
					if(p.transform){
						m = matrixLib.multiply(p.transform, m);
					}
					p = p.parent;
				}
				return m;	// gfx/matrix.Matrix2D
			},

			_fixTarget: function(){
				// tags:
				//		private
				return true;
			}
	});
	});
