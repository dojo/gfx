define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/_CircleBase"
], function(declare, SvgShape, CircleBase){
	var Circle = declare([SvgShape, CircleBase], {
		// summary:
		//		a circle shape (SVG)
	});
	Circle.nodeType = "circle";
	return Circle;
});
