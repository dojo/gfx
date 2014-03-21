define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix"
], function (require, registerSuite, assert, tu, gfx, matrix) {

	var surface;

	tu.registerSuite({
		name: "Rounded rectangle",
		setup: function () {
			surface = tu.createSurface(800, 600);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"roundrect": function () {
			var rect;
			rect = surface.createRect({x: 20, y: 100, width: 300, height: 200, r: 50});
			rect.fill = "red";
			rect.stroke = "black";
			rect = surface.createRect({x: 0, y: 100, width: 300, height: 200, r: 50});
			rect.fill = "red";
			rect.stroke = "black";
			rect.transform = matrix.translate(350, 0);
			rect.shape = {r: 0};

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><rect fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="20" y="100" width="300" height="200" ry="50" rx="50" fill-rule="evenodd" stroke-dasharray="none"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="100" width="300" height="200" ry="0" rx="0" fill-rule="evenodd" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,350.00000000,0.00000000)"></rect>',
				canvas: '["s","s","b","m",70,100,"a",270,150,50,-1.5708,0,false,"a",270,250,50,0,1.5708,false,"a",70,250,50,1.5708,3.1416,false,"a",70,150,50,3.1416,4.7124,false,"c","fil","255,0,0,1","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",350,0,"ro",0,"sc",1,1,"ro",0,"b","m",0,100,"l",300,100,"l",300,300,"l",0,300,"l",0,100,"c","fil","255,0,0,1","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		}
	});
});
