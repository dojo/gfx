define([
	"dcl/dcl",
	"./Shape",
	"../shape/_EllipseBase"
], function(dcl, SvgShape, EllipseBase){
	var Ellipse = dcl([SvgShape, EllipseBase], {
		// summary:
		//		an ellipse shape (SVG)
	});
	Ellipse.nodeType = "ellipse";
	return Ellipse;
});
