define([
	"../_base",
	"dojo/_base/declare",
	"./Shape"
], function(g, declare, Shape){
	var defaultShape = {
		// summary:
		//		An object defining the default Circle prototype.

		// type: String
		//		Specifies this object is a circle, value 'circle'
		type: "circle",

		// cx: Number
		//		The X coordinate of the center of the circle, default value 0.
		cx: 0,
		// cy: Number
		//		The Y coordinate of the center of the circle, default value 0.
		cy: 0,

		// r: Number
		//		The radius, default value 100.
		r: 100
	};
	var Circle = declare(Shape, {
		// summary:
		//		a generic circle
		shape: defaultShape,
		getBoundingBox: function(){
			// summary:
			//		returns the bounding box
			if(!this.bbox){
				var shape = this.shape;
				this.bbox = {x: shape.cx - shape.r, y: shape.cy - shape.r,
					width: 2 * shape.r, height: 2 * shape.r};
			}
			return this.bbox;	// gfx.Rectangle
		}
	});
	Circle.defaultShape = defaultShape;
	return Circle;
});
