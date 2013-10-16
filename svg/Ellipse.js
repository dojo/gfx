define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/_EllipseBase"
], function(declare, SvgShape, EllipseBase){
	var Ellipse = declare([SvgShape, EllipseBase], {
		// summary:
		//		an ellipse shape (SVG)
	});
	Ellipse.nodeType = "ellipse";
	return Ellipse;
});
