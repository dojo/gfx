define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx"
], function (require, registerSuite, assert, tu) {

	var surface;

	tu.registerSuite({
		name: "Surface resizing",
		setup: function () {
			surface = tu.createSurface(500, 500);

			var rect;
			rect = surface.createRect({width: 300, height: 300});
			rect.fill = [255, 0, 0, 0.3];
			rect.stroke = "red";
			rect = surface.createRect({x: 200, y: 200, width: 300, height: 300});
			rect.fill = [0, 0, 255, 0.3];
			rect.stroke = "green";
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		".getDimensions": function () {
			var t = surface.getDimensions();
			assert.equal(t.width, 500, "width");
			assert.equal(t.height, 500, "height");
		},
		"300x300": function () {
			surface.setDimensions(300, 300);
			var t = surface.getDimensions();
			assert.equal(t.width, 300, "width");
			assert.equal(t.height, 300, "height");
		},
		"400x400": function () {
			surface.setDimensions(400, 400);
			var t = surface.getDimensions();
			assert.equal(t.width, 400, "width");
			assert.equal(t.height, 400, "height");
		},
		"500x500": function () {
			surface.setDimensions(500, 500);
			var t = surface.getDimensions();
			assert.equal(t.width, 500, "width");
			assert.equal(t.height, 500, "height");
		}
	});
});
