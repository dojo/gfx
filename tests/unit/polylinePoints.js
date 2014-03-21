define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx"
], function (require, registerSuite, assert, tu, gfx) {

	var surface;

	tu.registerSuite({
		name: "Polypoints initialization",
		setup: function () {
			surface = tu.createSurface(500, 200);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"polyline": function () {

			var poly1 = surface.createPolyline([
				{x: 150, y: 50},
				{x: 200, y: 100},
				{x: 150, y: 150},
				{x: 100, y: 100},
				{x: 150, y: 50}
			]);
			poly1.stroke = {color: "blue"};
			var bbox1 = poly1.getBoundingBox();

			var poly2 = surface.createPolyline([150, 50, 200, 100, 150, 150, 100, 100, 150, 50]);
			poly2.stroke = {color: "blue"};
			poly2.transform = gfx.matrix.translate(200, 0);
			var bbox2 = poly2.getBoundingBox();

			var poly3 = surface.createPolyline();
			var bbox3 = poly3.getBoundingBox();

			assert.deepEqual(bbox1, bbox2, "Bboxes should be equal");
			assert.isNull(bbox3, "Bbox should be null");

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><polyline fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" points="150.00000000 50.00000000 200.00000000 100.00000000 150.00000000 150.00000000 100.00000000 100.00000000 150.00000000 50.00000000" stroke-dasharray="none"></polyline><polyline fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" points="150.00000000 50.00000000 200.00000000 100.00000000 150.00000000 150.00000000 100.00000000 100.00000000 150.00000000 50.00000000" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,200.00000000,0.00000000)"></polyline><polyline fill="none" fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" points=""></polyline>',
				canvas: '["s","s","b","m",150,50,"l",200,100,"l",150,150,"l",100,100,"l",150,50,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",200,0,"ro",0,"sc",1,1,"ro",0,"b","m",150,50,"l",200,100,"l",150,150,"l",100,100,"l",150,50,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","fil","0,0,0,0.0","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		}
	});
});
