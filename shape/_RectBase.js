define([
	"../_base",
	"dojo/_base/declare",
	"./_ShapeBase"
], function(g, declare, Shape){
	var defaultShape = {
		// summary:
		//		Defines the default Rect prototype.

		// type: String
		//		Specifies this default object is a type of Rect. Value is 'rect'
		type: "rect",

		// x: Number
		//		The X coordinate of the default rectangles position, value 0.
		x: 0,

		// y: Number
		//		The Y coordinate of the default rectangle's position, value 0.
		y: 0,

		// width: Number
		//		The width of the default rectangle, value 100.
		width: 100,

		// height: Number
		//		The height of the default rectangle, value 100.
		height: 100,

		// r: Number
		//		The corner radius for the default rectangle, value 0.
		r: 0
	};
	var Rect = declare(Shape, {
		// summary:
		//		a generic rectangle
		shape: defaultShape,
		getBoundingBox: function(){
			// summary:
			//		returns the bounding box (its shape in this case)
			return this.shape;	// gfx.Rectangle
		}
	});
	Rect.defaultShape = defaultShape;
	return Rect;
});
