define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix"
], function (require, registerSuite, assert, tu, gfx, matrix) {

	var surface, g;

	function bboxEqual(a, e, msg) {
		for (var p in e) {
			assert.strictEqual(a[p], e[p], msg + " (" + p + ")");
		}
	}

	tu.registerSuite({
		name: "Container.getBoundingBox",
		setup: function () {
			surface = tu.createSurface(500, 200);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		beforeEach: function () {
			g = surface.createGroup();
		},
		afterEach: function () {
			surface.clear();
		},
		"Default state": function () {
			// surface
			var bbox = surface.getBoundingBox();
			assert.isNull(bbox, "Unexpected value for empty surface bbox.");
			// empty group -> null bbox
			bbox = g.getBoundingBox();
			assert.isNull(bbox, "Unexpected value for empty group bbox.");
		},
		"Group with children": function () {
			// child
			var r = g.createRect();
			var bbox = g.getBoundingBox();
			bboxEqual(bbox, {x: 0, y: 0, width: 100, height: 100}, "Unexpected bbox value.");
			// children
			g.createRect({x: 200, y: 300});
			bbox = g.getBoundingBox();
			bboxEqual(bbox, {x: 0, y: 0, width: 300, height: 400}, "Unexpected composite bbox value.");
			// child with null bbox
			r = g.createRect();
			r.getBoundingBox = function () {
				return null;
			};
			var err = false;
			bbox = null;
			try {
				bbox = g.getBoundingBox();
			} catch (e) {
				err = true;
			}
			assert.isFalse(err, "getBoundingBox fails with null bbox.");
			bboxEqual(bbox, {x: 0, y: 0, width: 300, height: 400}, "Unexpected composite bbox value with null bbox.");
			// surface
			bbox = surface.getBoundingBox();
			bboxEqual(bbox, {x: 0, y: 0, width: 300, height: 400}, "Unexpected surface bbox value.");

		},
		"children with transform": function () {
			// child
			var r = g.createRect();
			var bbox = g.getBoundingBox();
			bboxEqual(bbox, {x: 0, y: 0, width: 100, height: 100}, "Unexpected bbox value.");
			// child with transform
			r.transform = matrix.translate(10, 0);
			bbox = g.getBoundingBox();
			bboxEqual(bbox, {x: 10, y: 0, width: 100, height: 100}, "Unexpected bbox value with child transform.");
			// the group has a transform -> getBoundingBox should not be modified
			g.transform = matrix.translate(10, 20);
			bbox = g.getBoundingBox();
			bboxEqual(bbox, {x: 10, y: 0, width: 100, height: 100}, "Unexpected bbox value with Group transform.");
			// surface
			bbox = null;
			bbox = surface.getBoundingBox();
			bboxEqual(bbox, {x: 20, y: 20, width: 100, height: 100}, "Unexpected surface bbox value.");
		},
		"Nested container": function () {
			g.createRect();
			g.createRect({x: 200, y: 300});
			var g2 = g.createGroup();
			g2.createRect();
			g2.createRect({x: 500});
			g2.transform = matrix.translate(100, 200);
			var bbox = g.getBoundingBox();
			bboxEqual(bbox, {x: 0, y: 0, width: 700, height: 400}, "Unexpected composite bbox value.");
		}
	});
});
