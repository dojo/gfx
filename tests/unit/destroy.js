define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/registry", "gfx/gfx"
], function (registerSuite, assert, tu, registry) {

	var surface;

	var createSurface = function () {
		surface = tu.createSurface(500, 500);
	};

	var cleanUp = function () {
		if (surface) {
			var id = surface.children[0].getUID();
			var test = surface._parent;
			surface.destroy();
			surface = null;
			var t = test.innerHTML;
			assert.strictEqual(t, "", "Garbage detected: " + t);
			assert.isUndefined(registry.byId(id), "Shape not disposed");
		}
		createSurface();
	};

	tu.registerSuite({
		name: "Surface.destroy",
		setup: function () {
			test = document.createElement("div");
			document.body.appendChild(test);
			createSurface();
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"destroy": function () {

			var path = surface.createPath("");

			// form concentric circles
			var center = {x: 250, y: 250};
			for (var r = 200; r > 0; r -= 30) {
				// make two 180 degree arcs to form a circle
				var start = {x: center.x, y: center.y - r};
				var end = {x: center.x, y: center.y + r};
				path.moveTo(start).arcTo(r, r, 0, true, true, end).arcTo(r, r, 0, true, true, start).closePath();
			}
			// set visual attributes
			path.fill = "red";
			path.stroke = "black";

			cleanUp();
		}
	});
});
