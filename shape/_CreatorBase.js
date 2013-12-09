define([
	"dcl/dcl",
	"../_base",
	"require"
], function(dcl, g, require){

	// Note:
	// We now require renderer-specific shape classes dynamically,
	// to avoid referencing the global gfx.Rect etc classes.
	// This allows us to make optional the global renderer switch
	// implemented by the gfx/renderer module and the switchTo method.

	// Since we use require(className) (i.e. simple module fetch, not an async load),
	// this means that the renderer-specific shape classes must already be required.
	// If the toplevel renderer module (e.g. gfx/svg) is loaded, all classes will be
	// required automatically. Otherwise, the application has to explicitly require
	// each shape class that it uses.

	// Class cache: global hash used to cache renderer shape classes,
	// keys are relative class names e.g. "../svg/Rect".
	var cc = {};

	return dcl(null, {
		// summary:
		//		shape creators

		// The shape class prefix that must be specified by the renderer,
		// e.g. "../svg";
		//_prefix: "./",

		createShape: function(shape){
			// summary:
			//		creates a shape object based on its type; it is meant to be used
			//		by group-like objects
			// shape: Object
			//		a shape descriptor object
			// returns: gfx/shape.Shape | Null
			//      a fully instantiated surface-specific Shape object
			switch(shape.type){
				case g.defaultPath.type:
					return this.createPath(shape);
				case g.defaultRect.type:
					return this.createRect(shape);
				case g.defaultCircle.type:
					return this.createCircle(shape);
				case g.defaultEllipse.type:
					return this.createEllipse(shape);
				case g.defaultLine.type:
					return this.createLine(shape);
				case g.defaultPolyline.type:
					return this.createPolyline(shape);
				case g.defaultImage.type:
					return this.createImage(shape);
				case g.defaultText.type:
					return this.createText(shape);
				case g.defaultTextPath.type:
					return this.createTextPath(shape);
			}
			return null;
		},
		createGroup: function(){
			// summary:
			//		creates a group shape
			var n = this._prefix+"Group";
			return this.createObject(cc[n]||(cc[n]=require(n)));
		},
		createRect: function(rect){
			// summary:
			//		creates a rectangle shape
			// rect: Object
			//		a path object (see gfx.defaultRect)
			var n = this._prefix+"Rect";
			return this.createObject(cc[n]||(cc[n]=require(n)), rect);
		},
		createEllipse: function(ellipse){
			// summary:
			//		creates an ellipse shape
			// ellipse: Object
			//		an ellipse object (see gfx.defaultEllipse)
			var n = this._prefix+"Ellipse";
			return this.createObject(cc[n]||(cc[n]=require(n)), ellipse);
		},
		createCircle: function(circle){
			// summary:
			//		creates a circle shape
			// circle: Object
			//		a circle object (see gfx.defaultCircle)
			var n = this._prefix+"Circle";
			return this.createObject(cc[n]||(cc[n]=require(n)), circle);
		},
		createLine: function(line){
			// summary:
			//		creates a line shape
			// line: Object
			//		a line object (see gfx.defaultLine)
			var n = this._prefix+"Line";
			return this.createObject(cc[n]||(cc[n]=require(n)), line);
		},
		createPolyline: function(points){
			// summary:
			//		creates a polyline/polygon shape
			// points: Object
			//		a points object (see gfx.defaultPolyline)
			//		or an Array of points
			var n = this._prefix+"Polyline";
			return this.createObject(cc[n]||(cc[n]=require(n)), points);
		},
		createImage: function(image){
			// summary:
			//		creates a image shape
			// image: Object
			//		an image object (see gfx.defaultImage)
			var n = this._prefix+"Image";
			return this.createObject(cc[n]||(cc[n]=require(n)), image);
		},
		createText: function(text){
			// summary:
			//		creates a text shape
			// text: Object
			//		a text object (see gfx.defaultText)
			var n = this._prefix+"Text";
			return this.createObject(cc[n]||(cc[n]=require(n)), text);
		},
		createPath: function(path){
			// summary:
			//		creates a path shape
			// path: Object
			//		a path object (see gfx.defaultPath)
			var n = this._prefix+"Path";
			return this.createObject(cc[n]||(cc[n]=require(n)), path);
		},
		createTextPath: function(text){
			// summary:
			//		creates a text shape
			// text: Object
			//		a textpath object (see gfx.defaultTextPath)
			var n = this._prefix+"TextPath";
			return this.createObject(cc[n]||(cc[n]=require(n)), {}).setText(text);
		},
		createObject: function(shapeType, rawShape){
			// summary:
			//		creates an instance of the passed shapeType class
			// shapeType: Function
			//		a class constructor to create an instance of
			// rawShape: Object
			//		properties to be passed in to the classes "setShape" method
			var shape = new shapeType(rawShape);
			this.add(shape);
			return shape;	// gfx/shape/Shape
		}
	});
});
