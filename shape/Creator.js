define([
	"dojo/_base/declare",
	"../_base"
], function(declare, g){
	return declare(null, {
		// summary:
		//		shape creators
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
			return this.createObject(g.Group);	// gfx/Group
		},
		createRect: function(rect){
			// summary:
			//		creates a rectangle shape
			// rect: Object
			//		a path object (see gfx.defaultRect)
			return this.createObject(g.Rect, rect);	// gfx/shape.Rect
		},
		createEllipse: function(ellipse){
			// summary:
			//		creates an ellipse shape
			// ellipse: Object
			//		an ellipse object (see gfx.defaultEllipse)
			return this.createObject(g.Ellipse, ellipse);	// gfx/shape.Ellipse
		},
		createCircle: function(circle){
			// summary:
			//		creates a circle shape
			// circle: Object
			//		a circle object (see gfx.defaultCircle)
			return this.createObject(g.Circle, circle);	// gfx/shape.Circle
		},
		createLine: function(line){
			// summary:
			//		creates a line shape
			// line: Object
			//		a line object (see gfx.defaultLine)
			return this.createObject(g.Line, line);	// gfx/shape.Line
		},
		createPolyline: function(points){
			// summary:
			//		creates a polyline/polygon shape
			// points: Object
			//		a points object (see gfx.defaultPolyline)
			//		or an Array of points
			return this.createObject(g.Polyline, points);	// gfx/shape.Polyline
		},
		createImage: function(image){
			// summary:
			//		creates a image shape
			// image: Object
			//		an image object (see gfx.defaultImage)
			return this.createObject(g.Image, image);	// gfx/shape.Image
		},
		createText: function(text){
			// summary:
			//		creates a text shape
			// text: Object
			//		a text object (see gfx.defaultText)
			return this.createObject(g.Text, text);	// gfx/shape.Text
		},
		createPath: function(path){
			// summary:
			//		creates a path shape
			// path: Object
			//		a path object (see gfx.defaultPath)
			return this.createObject(g.Path, path);	// gfx/shape.Path
		},
		createTextPath: function(text){
			// summary:
			//		creates a text shape
			// text: Object
			//		a textpath object (see gfx.defaultTextPath)
			return this.createObject(g.TextPath, {}).setText(text);	// gfx/shape.TextPath
		},
		createObject: function(shapeType, rawShape){
			// summary:
			//		creates an instance of the passed shapeType class
			// shapeType: Function
			//		a class constructor to create an instance of
			// rawShape: Object
			//		properties to be passed in to the classes 'setShape' method

			// SHOULD BE RE-IMPLEMENTED BY THE RENDERER!
			return null;	// gfx/shape.Shape
		}
	});
});
