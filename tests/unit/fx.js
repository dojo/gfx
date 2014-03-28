define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "dcl/advise", "dcolor/Color", "dcolor/utils",
	"gfx/gfx", "gfx/matrix", "gfx/fx"
], function (registerSuite, assert, tu, advise, Color, colorUtils, gfx, matrix, fx) {

	var surface, rect, text;

	var duration = 1000;

	function testAnim(testSuite, anim, testFunction) {
		var d = testSuite.async(anim.duration * 4);
		advise.after(anim, "onAnimate", function () {
			try {
				testFunction(anim.easing(anim._percent));
			} catch (err) {
				d.reject(err);
			}
		});
		advise.after(anim, "onEnd", function () {
			d.resolve();
		});
		anim.play();
		return d;
	}

	tu.registerSuite({
		name: "Animation effects",
		setup: function () {
			surface = tu.createSurface(500, 500);

			rect = surface.createRect({x: 100, y: 100, width: 300, height: 300});
			rect.fill = "yellow";
			rect.stroke = {
				color: "green",
				width: 5,
				join: "round"
			};
			text = surface.createText({x: 250, y: 250, text: "Hello!", align: "middle"});
			text.fill = "black";
			text.font = {family: "serif", size: "10pt"};

		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"stroke": function () {
			return testAnim(this, fx.animateStroke({
				duration: duration,
				shape: rect,
				color: {start: "green", end: "red"},
				width: {start: 5, end: 15},
				join: {values: ["bevel", "round"]}
			}), function (r) {
				assert.deepEqual(rect.stroke.color,
					colorUtils.blendColors(gfx.normalizeColor(Color.fromString("green")),
						gfx.normalizeColor(Color.fromString("red")), r), "stroke color at " + r);
				assert.equal(rect.stroke.width, 5 + 10 * r, "stroke width at " + r);
				assert.equal(rect.stroke.join, r < 0.5 ? "bevel" : "round", "stroke join at " + r);
			});
		},
		"fill": function () {
			return testAnim(this, fx.animateFill({
				duration: duration,
				shape: rect,
				color: {start: "yellow", end: "blue"}
			}), function (r) {
				assert.deepEqual(rect.fill, colorUtils.blendColors(gfx.normalizeColor(Color.fromString("yellow")),
					gfx.normalizeColor(Color.fromString("blue")), r), "fill color at " + r);
			});
		},
		"font": function () {
			return testAnim(this, fx.animateFont({
				duration: duration,
				shape: text,
				variant: {values: ["normal", "small-caps"]},
				size: {start: 10, end: 50, units: "pt"}
			}), function (r) {
				assert.deepEqual(text.font.variant, r < 0.5 ? "normal" : "small-caps", "font variant at " + r);
				assert.deepEqual(text.font.size, (10 + 40 * r) + "pt", "font size at " + r);
			});
		},
		"transform": function () {
			return testAnim(this, fx.animateTransform({
				duration: duration,
				shape: text,
				transform: [
					{name: "rotategAt", start: [0, 250, 250], end: [360, 350, 350]},
					{name: "translate", start: [0, 0], end: [100, 100]}
				]
			}), function (r) {
				assert.deepEqual(text.transform,
					matrix.multiply(matrix.rotategAt(360 * r, 250 + r * 100, 250 + r * 100),
						matrix.translate(r * 100, r * 100)), " transform at " + r);
			});
		},
		"matrix": function () {
			var cm = matrix.multiply([
				matrix.rotategAt(-90, 250, 250), matrix.translate(100, 100), matrix.scaleAt(2, 250, 250)
			]);
			var im = matrix.identity;
			return testAnim(this, fx.animateTransform({
				duration: duration,
				shape: text,
				transform: [
					{name: "matrix", start: matrix.identity, end: cm}
				]
			}), function (r) {
				var rm = new matrix.Matrix2D();
				for (var p in rm) {
					rm[p] = im[p] + r * (cm[p] - im[p]);
				}
				assert.deepEqual(text.transform, rm, " transform at " + r);
			});
		}
	});
});
