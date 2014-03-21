define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix"
], function (require, registerSuite, assert, tu, gfx, matrix) {
	var surface, line, poly;
	tu.registerSuite({
		name: "Polyline transform",
		setup: function () {
			surface = tu.createSurface(800, 600);

			line = surface.createLine({x1: 250, y1: 50, x2: 250, y2: 250});
			line.stroke = {color: "blue"};
			poly = surface.createPolyline([
				{x: 250, y: 250},
				{x: 300, y: 300},
				{x: 250, y: 350},
				{x: 200, y: 300},
				{x: 250, y: 250}
			]);
			poly.stroke = {color: "blue"};
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"rotate": function () {

			var rotate = matrix.rotategAt(5, 250, 250);

			line.applyTransform(rotate);
			poly.applyTransform(rotate);

			tu.compare(surface, {
				/* jshint maxlen:1000000, quotmark:single */
				svg: '<defs></defs><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="50" x2="250" y2="250" stroke-dasharray="none" transform="matrix(0.99619470,0.08715574,-0.08715574,0.99619470,22.74026116,-20.83761021)"></line><polyline fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" points="250.00000000 250.00000000 300.00000000 300.00000000 250.00000000 350.00000000 200.00000000 300.00000000 250.00000000 250.00000000" stroke-dasharray="none" transform="matrix(0.99619470,0.08715574,-0.08715574,0.99619470,22.74026116,-20.83761021)"></polyline>',
				canvas: '["s","s","t",22.7403,-20.8376,"ro",0,"sc",1,1,"ro",0.0873,"b","m",250,50,"l",250,250,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",22.7403,-20.8376,"ro",0,"sc",1,1,"ro",0.0873,"b","m",250,250,"l",300,300,"l",250,350,"l",200,300,"l",250,250,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});

			line.applyTransform(rotate);
			poly.applyTransform(rotate);

			tu.compare(surface, {
				/* jshint maxlen:1000000, quotmark:single */
				svg: '<defs></defs><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="50" x2="250" y2="250" stroke-dasharray="none" transform="matrix(0.98480775,0.17364818,-0.17364818,0.98480775,47.21010616,-39.61398267)"></line><polyline fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" points="250.00000000 250.00000000 300.00000000 300.00000000 250.00000000 350.00000000 200.00000000 300.00000000 250.00000000 250.00000000" stroke-dasharray="none" transform="matrix(0.98480775,0.17364818,-0.17364818,0.98480775,47.21010616,-39.61398267)"></polyline>',
				canvas: '["s","s","t",47.2101,-39.614,"ro",0,"sc",1,1,"ro",0.1745,"b","m",250,50,"l",250,250,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",47.2101,-39.614,"ro",0,"sc",1,1,"ro",0.1745,"b","m",250,250,"l",300,300,"l",250,350,"l",200,300,"l",250,250,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});
});
