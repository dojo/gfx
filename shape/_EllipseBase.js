define([
	"../_base",
	"dojo/_base/declare",
	"./_ShapeBase"
], function(g, declare, Shape){
	var defaultShape = {
		// summary:
		//		Defines the default Ellipse prototype.

		// type: String
		//		Specifies that this object is a type of Ellipse, value is 'ellipse'
		type: "ellipse",

		// cx: Number
		//		The X coordinate of the center of the ellipse, default value 0.
		cx: 0,

		// cy: Number
		//		The Y coordinate of the center of the ellipse, default value 0.
		cy: 0,

		// rx: Number
		//		The radius of the ellipse in the X direction, default value 200.
		rx: 200,

		// ry: Number
		//		The radius of the ellipse in the Y direction, default value 200.
		ry: 100
	};
	var Ellipse = declare(Shape, {
		// summary:
		//		a generic ellipse
		shape: defaultShape,
		getBoundingBox: function(){
			// summary:
			//		returns the bounding box
			if(!this.bbox){
				var shape = this.shape;
				this.bbox = {x: shape.cx - shape.rx, y: shape.cy - shape.ry,
					width: 2 * shape.rx, height: 2 * shape.ry};
			}
			return this.bbox;	// gfx.Rectangle
		}
	});
	Ellipse.defaultShape = defaultShape;
	return Ellipse;
});
