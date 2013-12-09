define([
	"dcl/dcl",
	"./Shape",
	"../shape/_CircleBase"
], function(dcl, SvgShape, CircleBase){
	var Circle = dcl([SvgShape, CircleBase], {
		// summary:
		//		a circle shape (SVG)
	});
	Circle.nodeType = "circle";
	return Circle;
});
