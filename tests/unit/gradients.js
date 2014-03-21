define([
	"intern!object", "intern/chai!assert", "dcl/dcl", "../utils/testUtils", "gfx/gfx", "dcolor/ExtendedColor"
], function (registerSuite, assert, dcl, tu) {

	var surface;

	tu.registerSuite({
		name: "Gradients",
		setup: function () {
			surface = tu.createSurface(300, 300);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		afterEach: function () {
			surface.clear();
		},
		"gradients with alpha": function () {

			var rect;

			var fillObj = {
				colors: [
					{ offset: 0, color: [255, 255, 0, 0] },
					{ offset: 0.5, color: "orange" },
					{ offset: 1, color: [255, 255, 0, 0] }
				]
			};
			// create a background
			surface.createRect({width: 300, height: 300}).fill = "lightgrey";

			// create a rect
			rect = surface.createRect({
				width: 300,
				height: 100
			});
			var fill = {
				type: "linear",
				x1: 0,
				y1: 0,
				x2: 300,
				y2: 0
			};
			dcl.mix(fill, fillObj);
			rect.fill = fill;
			// create a circle
			var circle = surface.createEllipse({
				cx: 150,
				cy: 200,
				rx: 100,
				ry: 100
			});
			fill = {
				type: "radial",
				cx: 150,
				cy: 200
			};
			dcl.mix(fill, fillObj);
			circle.fill = fill;

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs><linearGradient id="dojoxUnique1" gradientUnits="userSpaceOnUse" x1="0.00000000" y1="0.00000000" x2="300.00000000" y2="0.00000000"><stop offset="0.00000000" stop-color="rgb(255, 255, 0)" stop-opacity="0"></stop><stop offset="0.50000000" stop-color="rgb(255, 165, 0)" stop-opacity="1"></stop><stop offset="1.00000000" stop-color="rgb(255, 255, 0)" stop-opacity="0"></stop></linearGradient><radialGradient id="dojoxUnique2" gradientUnits="userSpaceOnUse" cx="150.00000000" cy="200.00000000" r="100.00000000"><stop offset="0.00000000" stop-color="rgb(255, 255, 0)" stop-opacity="0"></stop><stop offset="0.50000000" stop-color="rgb(255, 165, 0)" stop-opacity="1"></stop><stop offset="1.00000000" stop-color="rgb(255, 255, 0)" stop-opacity="0"></stop></radialGradient></defs><rect fill="rgb(211, 211, 211)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="300" height="300" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="url(#dojoxUnique1)" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="300" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><ellipse fill="url(#dojoxUnique2)" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="150" cy="200" rx="100" ry="100" fill-rule="evenodd"></ellipse>',
				canvas: '["s","s","b","m",0,0,"l",300,0,"l",300,300,"l",0,300,"l",0,0,"c","fil","211,211,211,1","f","r","s","b","m",0,0,"l",300,0,"l",300,100,"l",0,100,"l",0,0,"c","fil",["l",0,0,300,0,0,"255,255,0,0",0.5,"255,165,0,1",1,"255,255,0,0"],"f","r","s","b","m",242.388,161.7317,"be",252.5373,186.2345,252.5373,213.7655,242.388,238.2683,"be",232.2386,262.7712,212.7712,282.2386,188.2683,292.388,"be",163.7655,302.5373,136.2345,302.5373,111.7317,292.388,"be",87.2288,282.2386,67.7614,262.7712,57.612,238.2683,"be",47.4627,213.7655,47.4627,186.2345,57.612,161.7317,"be",67.7614,137.2288,87.2288,117.7614,111.7317,107.612,"be",136.2345,97.4627,163.7655,97.4627,188.2683,107.612,"be",212.7712,117.7614,232.2386,137.2288,242.388,161.7317,"c","fil",["r",150,200,0,150,200,100,0,"255,255,0,0",0.5,"255,165,0,1",1,"255,255,0,0"],"f","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},

		"linear gradients": function () {
			var lg1 = {
				type: "linear",
				x1: 0,
				y1: 0,
				x2: 300,
				y2: 0,
				colors: [
					{ offset: 0, color: [0, 0, 0, 0] },
					{ offset: 0.1, color: "#000000" },
					{ offset: 0.2, color: "red" },
					{ offset: 0.3, color: "rgb(0,255,0)" },
					{ offset: 0.4, color: "blue" },
					{ offset: 0.5, color: "#ff0" },
					{ offset: 0.6, color: [128] },
					{ offset: 0.7, color: [128, 128, 64] },
					{ offset: 1, color: [0, 255, 0, 0] }
				]
			};
			var lg2 = {
				type: "linear",
				x1: 0,
				y1: 0,
				x2: 300,
				y2: 0,
				colors: [
					{ offset: 0.2, color: "red" },
					{ offset: 0.3, color: "yellow" }
				]
			};
			var group = surface.createGroup();
			var rect1 = surface.createRect({
				width: 300,
				height: 100
			});
			rect1.fill = lg1;
			var rect2 = surface.createRect({
				y: 150,
				width: 300,
				height: 100
			});
			rect2.fill = lg2;
			group.add(rect1);
			group.add(rect2);

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs><linearGradient id="dojoxUnique3" gradientUnits="userSpaceOnUse" x1="0.00000000" y1="0.00000000" x2="300.00000000" y2="0.00000000"><stop offset="0.00000000" stop-color="rgb(0, 0, 0)" stop-opacity="0"></stop><stop offset="0.10000000" stop-color="rgb(0, 0, 0)" stop-opacity="1"></stop><stop offset="0.20000000" stop-color="rgb(255, 0, 0)" stop-opacity="1"></stop><stop offset="0.30000000" stop-color="rgb(0, 255, 0)" stop-opacity="1"></stop><stop offset="0.40000000" stop-color="rgb(0, 0, 255)" stop-opacity="1"></stop><stop offset="0.50000000" stop-color="rgb(255, 255, 0)" stop-opacity="1"></stop><stop offset="0.60000000" stop-color="rgb(128, 255, 255)" stop-opacity="1"></stop><stop offset="0.70000000" stop-color="rgb(128, 128, 64)" stop-opacity="1"></stop><stop offset="1.00000000" stop-color="rgb(0, 255, 0)" stop-opacity="0"></stop></linearGradient><linearGradient id="dojoxUnique4" gradientUnits="userSpaceOnUse" x1="0.00000000" y1="0.00000000" x2="300.00000000" y2="0.00000000"><stop offset="0.20000000" stop-color="rgb(255, 0, 0)" stop-opacity="1"></stop><stop offset="0.30000000" stop-color="rgb(255, 255, 0)" stop-opacity="1"></stop></linearGradient></defs><g><rect fill="url(#dojoxUnique3)" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="300" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="url(#dojoxUnique4)" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="150" width="300" height="100" ry="0" rx="0" fill-rule="evenodd"></rect></g>',
				canvas: '["s","s","s","b","m",0,0,"l",300,0,"l",300,100,"l",0,100,"l",0,0,"c","fil",["l",0,0,300,0,0,"0,0,0,0",0.1,"0,0,0,1",0.2,"255,0,0,1",0.3,"0,255,0,1",0.4,"0,0,255,1",0.5,"255,255,0,1",0.6,"128,255,255,1",0.7,"128,128,64,1",1,"0,255,0,0"],"f","r","s","b","m",0,150,"l",300,150,"l",300,250,"l",0,250,"l",0,150,"c","fil",["l",0,0,300,0,0.2,"255,0,0,1",0.3,"255,255,0,1"],"f","r","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */

		}
	});
});
