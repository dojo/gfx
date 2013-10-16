define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/Line"
], function(declare, SvgShape, BaseLine){
	var Line = declare([SvgShape, BaseLine], {
		// summary:
		//		a line shape (SVG)
	});
	Line.nodeType = "line";
	return Line;
});
