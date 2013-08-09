define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/Line"
], function(declare, svgShape, baseLine){
	var Line = declare([svgShape, baseLine], {
		// summary:
		//		a line shape (SVG)
	});
	Line.nodeType = "line";
	return Line;
});
