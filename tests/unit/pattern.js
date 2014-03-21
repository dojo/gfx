define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx"
], function (require, registerSuite, assert, tu, gfx) {
	var surface;
	tu.registerSuite({
		name: "Pattern fill",
		setup: function () {
			surface = tu.createSurface(800, 600);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"pattern fill": function () {
			var pattern = {
				type: "pattern",
				x: 30,
				y: 20,
				width: 75,
				height: 60,
				src: require.toUrl("../images/eugene-sm.jpg")
			};
			var ellipse = surface.createEllipse({cx: 400, cy: 200, rx: 350, ry: 150});
			ellipse.stroke = {color: "blue", width: 1 };
			ellipse.fill = pattern;
			tu.compareWithImages(this, surface, {
				/* jshint maxlen:1000000, quotmark:single */
				svg: '<defs><pattern id="dojoxUnique1" patternUnits="userSpaceOnUse" x="30.00000000" y="20.00000000" width="75.00000000" height="60.00000000"><image x="0" y="0" width="75.00000000" height="60.00000000" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image></pattern></defs><ellipse fill="url(#dojoxUnique1)" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="400" cy="200" rx="350" ry="150" stroke-dasharray="none" fill-rule="evenodd"></ellipse>',
				canvas: '["s","s","b","m",723.3578,142.5975,"be",758.8807,179.3517,758.8807,220.6483,723.3578,257.4025,"be",687.835,294.1567,619.699,323.3578,533.9392,338.5819,"be",448.1794,353.806,351.8206,353.806,266.0608,338.5819,"be",180.301,323.3578,112.165,294.1567,76.6422,257.4025,"be",41.1193,220.6483,41.1193,179.3517,76.6422,142.5975,"be",112.165,105.8433,180.301,76.6422,266.0608,61.4181,"be",351.8206,46.194,448.1794,46.194,533.9392,61.4181,"be",619.699,76.6422,687.835,105.8433,723.3578,142.5975,"c","crea",["d","../../../gfx/tests/images/eugene-sm.jpg",0,0,300,200,0,5,75,50],"repeat","fil",{},"t",30,20,"f","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});
});
