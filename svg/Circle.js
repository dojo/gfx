define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/Circle"
], function(declare, svgShape, baseCircle){
	var Circle = declare([svgShape, baseCircle], {
		// summary:
		//		a circle shape (SVG)
	});
	Circle.nodeType = "circle";
	return Circle;
});
