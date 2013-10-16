define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/_LineBase"
], function(declare, SvgShape, LineBase){
	var Line = declare([SvgShape, LineBase], {
		// summary:
		//		a line shape (SVG)
	});
	Line.nodeType = "line";
	return Line;
});
