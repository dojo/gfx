define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/Circle"
], function(declare, SvgShape, BaseCircle){
	var Circle = declare([SvgShape, BaseCircle], {
		// summary:
		//		a circle shape (SVG)
	});
	Circle.nodeType = "circle";
	return Circle;
});
