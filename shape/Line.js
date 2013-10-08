define([
	"../_base",
	"dojo/_base/declare",
	"./Shape"
], function(g, declare, Shape){
	var defaultShape = {
		// summary:
		//		An object defining the default Line prototype.

		// type: String
		//		Specifies this is a Line, value 'line'
		type: "line",

		// x1: Number
		//		The X coordinate of the start of the line, default value 0.
		x1: 0,

		// y1: Number
		//		The Y coordinate of the start of the line, default value 0.
		y1: 0,

		// x2: Number
		//		The X coordinate of the end of the line, default value 100.
		x2: 100,

		// y2: Number
		//		The Y coordinate of the end of the line, default value 100.
		y2: 100
	};
	var Line = declare(Shape, {
		// summary:
		//		a generic line (do not instantiate it directly)
		shape: defaultShape,
		getBoundingBox: function(){
			// summary:
			//		returns the bounding box
			if(!this.bbox){
				var shape = this.shape;
				this.bbox = {
					x:		Math.min(shape.x1, shape.x2),
					y:		Math.min(shape.y1, shape.y2),
					width:	Math.abs(shape.x2 - shape.x1),
					height:	Math.abs(shape.y2 - shape.y1)
				};
			}
			return this.bbox;	// gfx.Rectangle
		}
	});
	Line.defaultShape = defaultShape;
	return Line;
});
