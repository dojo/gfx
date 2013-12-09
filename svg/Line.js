define([
	"dcl/dcl",
	"./Shape",
	"../shape/_LineBase"
], function(dcl, SvgShape, LineBase){
	var Line = dcl([SvgShape, LineBase], {
		// summary:
		//		a line shape (SVG)
	});
	Line.nodeType = "line";
	return Line;
});
