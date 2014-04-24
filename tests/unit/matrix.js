define([
	"intern!object", "intern/chai!assert", "gfx/matrix", "../utils/testUtils"
], function (registerSuite, assert, m, tu) {
	var eq = function (a, b) {
		assert.isTrue(2 * Math.abs(a - b) / ((a < 1 && b < 1) ? 1 : a + b) < 1e-6);
	};
	tu.addTitle("GFX matrix functions");
	registerSuite({
		name: "gfx.tests.matrix",
		teardown: function () {
			tu.checkEmpty();
		},
		"Identity": function () {
			var a = new m.Matrix2D();
			eq(a.xx, 1);
			eq(a.yy, 1);
			eq(a.xy, 0);
			eq(a.yx, 0);
			eq(a.dx, 0);
			eq(a.dy, 0);
		},
		"Rot30g": function () {
			var a = m.rotateg(30);
			eq(a.xx, a.yy);
			eq(a.xy, -a.yx);
			eq(a.dx, 0);
			eq(a.dy, 0);
			eq(a.yx, 0.5);
			assert.isTrue(a.xy < 0);
			assert.isTrue(a.yx > 0);
		},
		"Rot45g": function () {
			var a = m.rotateg(45);
			eq(a.xx, a.yy);
			eq(a.xy, -a.yx);
			eq(a.dx, 0);
			eq(a.dy, 0);
			eq(a.xx, a.yx);
			eq(a.yy, -a.xy);
		},
		"Rot90g": function () {
			var a = m.rotateg(90);
			eq(a.xx, a.yy);
			eq(a.xy, -a.yx);
			eq(a.dx, 0);
			eq(a.dy, 0);
			eq(a.xx, 0);
			eq(a.yx, 1);
		},
		"CombineIdentities": function () {
			var a = m.normalize([new m.Matrix2D(), new m.Matrix2D(), new m.Matrix2D()]);
			eq(a.xx, 1);
			eq(a.yy, 1);
			eq(a.xy, 0);
			eq(a.yx, 0);
			eq(a.dx, 0);
			eq(a.dy, 0);
		},
		"CombineExclusive": function () {
			var a = m.normalize([m.rotateg(30), m.rotateg(-30)]);
			eq(a.xx, 1);
			eq(a.yy, 1);
			eq(a.xy, 0);
			eq(a.yx, 0);
			eq(a.dx, 0);
			eq(a.dy, 0);
		},
		"CombineInverted": function () {
			var a = m.normalize([m.rotateg(30), m.invert(m.rotateg(30))]);
			eq(a.xx, 1);
			eq(a.yy, 1);
			eq(a.xy, 0);
			eq(a.yx, 0);
			eq(a.dx, 0);
			eq(a.dy, 0);
		},
		"Rot90gAt": function () {
			var a = m.rotategAt(90, 10, 10);
			eq(a.xx, a.yy);
			eq(a.xy, -a.yx);
			eq(a.dx, 20);
			eq(a.dy, 0);
			eq(a.xx, 0);
			eq(a.yx, 1);
		},
		"MultPoint1": function () {
			var b = m.multiplyPoint(m.rotategAt(90, 10, 10), 10, 10);
			eq(b.x, 10);
			eq(b.y, 10);
		},
		"MultPoint2": function () {
			var b = m.multiplyPoint(m.rotategAt(90, 10, 10), {x: 10, y: 5});
			eq(b.x, 15);
			eq(b.y, 10);
		},
		"MultPoint3": function () {
			var b = m.multiplyPoint(m.rotategAt(90, 10, 10), 10, 15);
			eq(b.x, 5);
			eq(b.y, 10);
		},
		"Scale1": function () {
			var a = m.normalize([m.scale(2, 1), m.invert(m.rotateg(45))]);
			eq(a.xx, 2 * a.yy);
			eq(a.xy, -2 * a.yx);
			eq(a.dx, 0);
			eq(a.dy, 0);
			eq(a.xx, a.xy);
			eq(a.yy, -a.yx);
		},
		"Scale2": function () {
			var a = m.normalize([m.scale(1, 2), m.invert(m.rotateg(45))]);
			eq(2 * a.xx, a.yy);
			eq(2 * a.xy, -a.yx);
			eq(a.dx, 0);
			eq(a.dy, 0);
			eq(a.xx, a.xy);
			eq(a.yy, -a.yx);
		},
		"Scale3": function () {
			var a = m.normalize([m.rotateg(45), m.scale(2, 1)]);
			eq(a.xx, 2 * a.yy);
			eq(a.yx, -2 * a.xy);
			eq(a.dx, 0);
			eq(a.dy, 0);
			eq(a.xx, a.yx);
			eq(a.yy, -a.xy);
		},
		"Scale4": function () {
			var a = m.normalize([m.rotateg(45), m.scale(1, 2)]);
			eq(2 * a.xx, a.yy);
			eq(2 * a.yx, -a.xy);
			eq(a.dx, 0);
			eq(a.dy, 0);
			eq(a.xx, a.yx);
			eq(a.yy, -a.xy);
		},
		"Scale5": function () {
			var a = m.normalize([m.rotategAt(45, 100, 100), m.scale(2)]);
			eq(a.xx, a.yy);
			eq(a.xy, -a.yx);
			eq(a.xx, a.yx);
			eq(a.yy, -a.xy);
			eq(a.dx, 100);
			assert.isTrue(a.dy < 0);
			var b = m.normalize([m.scale(2), m.rotategAt(45, 100, 100)]);
			eq(b.xx, b.yy);
			eq(b.xy, -b.yx);
			eq(b.xx, b.yx);
			eq(b.yy, -b.xy);
			eq(b.dx, 200);
			assert.isTrue(b.dy < 0);
			eq(a.xx, b.xx);
			eq(a.xy, b.xy);
			eq(a.yx, b.yx);
			eq(a.yy, b.yy);
			eq(2 * a.dx, b.dx);
			eq(2 * a.dy, b.dy);
			var c = m.normalize([m.rotateg(45), m.scale(2)]);
			eq(c.xx, c.yy);
			eq(c.xy, -c.yx);
			eq(c.xx, c.yx);
			eq(c.yy, -c.xy);
			eq(c.dx, 0);
			eq(c.dy, 0);
			var d = m.normalize([m.scale(2), m.rotateg(45)]);
			eq(d.xx, d.yy);
			eq(d.xy, -d.yx);
			eq(d.xx, d.yx);
			eq(d.yy, -d.xy);
			eq(d.dx, 0);
			eq(d.dy, 0);
			eq(a.xx, c.xx);
			eq(a.xy, c.xy);
			eq(a.yx, c.yx);
			eq(a.yy, c.yy);
			eq(a.xx, d.xx);
			eq(a.xy, d.xy);
			eq(a.yx, d.yx);
			eq(a.yy, d.yy);
		},
		"Scale6": function () {
			var a = m.normalize(6);
			eq(a.xx, 6);
			eq(a.yy, 6);
			eq(a.xy, 0);
			eq(a.yx, 0);
			eq(a.dx, 0);
			eq(a.dy, 0);
		},
		"Scale7": function () {
			var a = m.normalize([2, m.scale(2, 1)]);
			eq(a.xx, 4);
			eq(a.yy, 2);
			eq(a.xy, 0);
			eq(a.yx, 0);
			eq(a.dx, 0);
			eq(a.dy, 0);
		},
		"Translate": function () {
			var a = m.normalize({dx: 100, dy: 200});
			eq(a.xx, 1);
			eq(a.yy, 1);
			eq(a.xy, 0);
			eq(a.yx, 0);
			eq(a.dx, 100);
			eq(a.dy, 200);
		},
		"Reflect1": function () {
			var b = m.multiplyPoint(m.reflect(1, 1), 1, 0);
			eq(b.x, 0);
			eq(b.y, 1);
		},
		"Reflect2": function () {
			var b = m.multiplyPoint(m.reflect(1, 1), 0, 1);
			eq(b.x, 1);
			eq(b.y, 0);
		},
		"Project1": function () {
			var b = m.multiplyPoint(m.project(1, 1), 1, 0);
			eq(b.x, 0.5);
			eq(b.y, 0.5);
		},
		"Project2": function () {
			var b = m.multiplyPoint(m.project(1, 1), 0, 1);
			eq(b.x, 0.5);
			eq(b.y, 0.5);
		},
		"IsIdentity": function () {
			var a = new m.Matrix2D();
			assert.isTrue(m.isIdentity(a));
			a.xy = 1;
			assert.isFalse(m.isIdentity(a));
		},
		"MultiplyRectangle": function () {
			var a = new m.Matrix2D(), r = {x: 0, y: 0, width: 3, height: 2}, res;
			// multiply by identity -> same rect
			res = m.multiplyRectangle(a, r);
			assert.isTrue(res.x === r.x && res.y === r.y && res.width === r.width && res.height === r.height);
			res = m.multiplyRectangle(m.scale(2, 2), r);
			eq(res.x, 0);
			eq(res.y, 0);
			eq(res.width, 6);
			eq(res.height, 4);
			a = m.rotategAt(-45, 0, 0);
			var tl = m.multiplyPoint(a, 0, 0), // top left
				tr = m.multiplyPoint(a, 3, 0), // top right
				br = m.multiplyPoint(a, 3, 2), // bottom right
				bl = m.multiplyPoint(a, 0, 2), // bottom left
				exp = {x: tl.x, y: tr.y, width: br.x, height: bl.y - tr.y}; // expected
			res = m.multiplyRectangle(a, r);
			eq(res.x, exp.x);
			eq(res.y, exp.y);
			eq(res.width, exp.width);
			eq(res.height, exp.height);
			// matrices array
			res = m.multiplyRectangle([m.translate(10, 10), m.scale(2, 2)], r);
			eq(res.x, 10);
			eq(res.y, 10);
			eq(res.width, 6);
			eq(res.height, 4);
		}

	});
});
