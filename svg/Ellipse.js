define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/Ellipse"
], function(declare, SvgShape, BaseEllipse){
	var Ellipse = declare([SvgShape, BaseEllipse], {
		// summary:
		//		an ellipse shape (SVG)
	});
	Ellipse.nodeType = "ellipse";
	return Ellipse;
});
