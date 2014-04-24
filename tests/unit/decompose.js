define([
	"intern!object", "intern/chai!assert", "gfx/decompose", "gfx/matrix", "../utils/testUtils"
], function (registerSuite, assert, decompose, m, tu) {
	var eq = function (a, b) {
		assert.isTrue(2 * Math.abs(a - b) / ((a < 1 && b < 1) ? 1 : a + b) < 1e-6);
	};
	var eqM = function (a, b) {
		eq(a.xx, b.xx);
		eq(a.yy, b.yy);
		eq(a.xy, b.xy);
		eq(a.yx, b.yx);
		eq(a.dx, b.dx);
		eq(a.dy, b.dy);
	};
	var compose = function (r) {
		return m.normalize([
			m.translate(r.dx, r.dy), m.rotate(r.angle2), m.scale(r.sx, r.sy), m.rotate(r.angle1)
		]);
	};
	var reconstruct = function (a) {
		return compose(decompose(a));
	};
	var compare = function (a) {
		var A = m.normalize(a);
		eqM(A, reconstruct(A));
	};
	tu.addTitle("GFX matrix decomposition");
	registerSuite({
		name: "gfx.tests.decompose",
		teardown: function () {
			tu.checkEmpty();
		},
		"Identity": function () {
			compare(m.identity);
		},
		"FlipX": function () {
			compare(m.flipX);
		},
		"FlipY": function () {
			compare(m.flipY);
		},
		"FlipXY": function () {
			compare(m.flipXY);
		},
		"Translation": function () {
			compare(m.translate(45, -15));
		},
		"Rotation": function () {
			compare(m.rotateg(35));
		},
		"SkewX": function () {
			compare(m.skewXg(35));
		},
		"SkewY": function () {
			compare(m.skewYg(35));
		},
		"Reflect": function () {
			compare(m.reflect(13, 27));
		},
		"Project": function () {
			compare(m.project(13, 27));
		},
		"Scale1": function () {
			compare(m.scale(3));
		},
		"Scale2": function () {
			compare(m.scale(3, -1));
		},
		"Scale3": function () {
			compare(m.scale(-3, 1));
		},
		"Scale4": function () {
			compare(m.scale(-3, -1));
		},
		"ScaleRotate1": function () {
			compare([m.scale(3), m.rotateAt(35, 13, 27)]);
		},
		"ScaleRotate2": function () {
			compare([m.scale(3, -1), m.rotateAt(35, 13, 27)]);
		},
		"ScaleRotate3": function () {
			compare([m.scale(-3, 1), m.rotateAt(35, 13, 27)]);
		},
		"ScaleRotate4": function () {
			compare([m.scale(-3, -1), m.rotateAt(35, 13, 27)]);
		},
		"RotateScale1": function () {
			compare([m.rotateAt(35, 13, 27), m.scale(3)]);
		},
		"RotateScale2": function () {
			compare([m.rotateAt(35, 13, 27), m.scale(3, -1)]);
		},
		"RotateScale3": function () {
			compare([m.rotateAt(35, 13, 27), m.scale(-3, 1)]);
		},
		"RotateScale4": function () {
			compare([m.rotateAt(35, 13, 27), m.scale(-3, -1)]);
		},
		"RotateScaleRotate1": function () {
			compare([m.rotateAt(35, 13, 27), m.scale(3), m.rotateAt(-15, 163, -287)]);
		},
		"RotateScaleRotate2": function () {
			compare([m.rotateAt(35, 13, 27), m.scale(3, -1), m.rotateAt(-15, 163, -287)]);
		},
		"RotateScaleRotate3": function () {
			compare([m.rotateAt(35, 13, 27), m.scale(-3, 1), m.rotateAt(-15, 163, -287)]);
		},
		"RotateScaleRotate4": function () {
			compare([m.rotateAt(35, 13, 27), m.scale(-3, -1), m.rotateAt(-15, 163, -287)]);
		}
	});
});
