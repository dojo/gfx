define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/Ellipse"
], function(declare, svgShape, baseEllipse){
	var Ellipse = declare([svgShape, baseEllipse], {
		// summary:
		//		an ellipse shape (SVG)
	});
	Ellipse.nodeType = "ellipse";
	return Ellipse;
});
