define([
	"intern!object", "intern/chai!assert", "dojo/aspect", "../utils/testUtils", "gfx/gfx", "gfx/shape", "gfx/svg",
	"gfx/canvas"
], function (registerSuite, assert, aspect, tu, gfx, gfxshape, svg, canvas) {

	var surface;

	tu.addTitle("GFX batch modifications");

	registerSuite({
		name: "Batching operations [SVG]",
		teardown: function () {
			tu.checkEmpty();
		},
		beforeEach: function () {
			var dn = document.createElement("div");
			document.body.appendChild(dn);
			surface = new svg.Surface(dn, 300, 300);
		},
		afterEach: function () {
			tu.destroySurface(surface);
		},
		"Surface.openBatch": function () {
			var ret = surface.openBatch();
			assert.isTrue(ret === surface, "Invalid openBatch return value.");
			var rect = surface.createRect();
			var p = rect.rawNode.parentNode;
			assert.isTrue(p !== surface.rawNode, "Unexpected DOM parent node.");
			surface.clear();
		},
		"Surface.closeBatch": function () {
			surface.openBatch();
			var rect = surface.createRect();
			var ret = surface.closeBatch();
			assert.isTrue(ret === surface, "Invalid closeBatch return value.");
			var p = rect.rawNode.parentNode;
			assert.isTrue(p === surface.rawNode, "Unexpected DOM parent node.");
			surface.clear();
		},
		"nested openBatch": function () {
			surface.openBatch();
			var rect = surface.createRect();
			rect.fill = "red";
			surface.openBatch();
			var rect2 = surface.createRect({x: 200});
			rect2.fill = "green";
			assert.isTrue(rect.rawNode.parentNode === rect2.rawNode.parentNode, "Unexpected parent nodes for rects.");
			surface.closeBatch();
			var p = rect2.rawNode.parentNode;
			assert.isTrue(p !== surface.rawNode, "Unexpected rect2 DOM parent node in nested batch.");
			p = rect.rawNode.parentNode;
			assert.isTrue(p !== surface.rawNode, "Unexpected rect DOM parent node in nested batch.");
			surface.closeBatch();
			p = rect2.rawNode.parentNode;
			assert.isTrue(p === surface.rawNode,
				"Unexpected rect2 DOM parent node in nested batch. Expected: surface.parentNode");
			p = rect.rawNode.parentNode;
			assert.isTrue(p === surface.rawNode,
				"Unexpected rect DOM parent node in nested batch. Expected: surface.parentNode");
		},
		"Group batching": function () {
			var g = surface.createGroup();
			g.openBatch();
			var rect = g.createRect();
			rect.fill = "red";
			assert.isTrue(rect.rawNode.parentNode !== g.rawNode, "Unexpected parent node for rect.");
			var rect2 = surface.createRect();
			assert.isTrue(rect2.rawNode.parentNode === surface.rawNode, "Unexpected parent node for rect2.");
			g.closeBatch();
			assert.isTrue(rect.rawNode.parentNode === g.rawNode, "Unexpected parent node for rect after closeBatch.");


		},
		"Nested Group/Surface batching": function () {
			surface.openBatch();
			var g = surface.createGroup();
			assert.isTrue(g.rawNode.parentNode !== surface.rawNode, "Unexpected parent node for g.");
			g.openBatch();
			var rect = g.createRect();
			rect.fill = "red";
			assert.isTrue(rect.rawNode.parentNode !== g.rawNode, "Unexpected parent node for rect.");
			g.closeBatch();
			assert.isTrue(rect.rawNode.parentNode === g.rawNode, "Unexpected parent node for rect after closeBatch.");
			assert.isTrue(g.rawNode.parentNode !== surface.rawNode, "Unexpected parent node for g.");
			surface.closeBatch();
			assert.isTrue(g.rawNode.parentNode === surface.rawNode, "Unexpected parent node for g after closeBatch.");
		}
	});
//
// Canvas
//
	registerSuite({
		name: "Batching operations [Canvas]",
		beforeEach: function () {
			var dn = document.createElement("div");
			document.body.appendChild(dn);
			surface = new canvas.Surface(dn, 300, 300);
			surface._render(); // flushes pendingRender coming from ctor
		},
		afterEach: function () {
			tu.destroySurface(surface);
		},
		"Surface.openBatch": function () {
			var ret = surface.openBatch();
			assert.isTrue(ret === surface, "Invalid openBatch return value.");
			var called = false;
			aspect.after(surface, "makeDirty", function () {
				called = true;
			});
			surface.createRect();
			assert.isTrue(!called, "Unexpected surface.render() call.");
		},
		"Surface.closeBatch": function () {
			surface.openBatch();
			surface.createRect();
			var called = false;
			aspect.after(surface, "makeDirty", function () {
				called = true;
			});
			var ret = surface.closeBatch();
			assert.isTrue(ret === surface, "Invalid closeBatch return value.");
			assert.isTrue(called, "Unexpected surface.render() call.");
		},
		"nested openBatch": function () {
			surface.openBatch();
			var rect = surface.createRect();
			rect.fill = "red";
			var called = false;
			aspect.after(surface, "makeDirty", function () {
				called = true;
			});
			surface.openBatch();
			var rect2 = surface.createRect({x: 200});
			rect2.fill = "green";
			assert.isTrue(!called, "Unexpected surface.render() call in nested batch [0].");
			surface.closeBatch();
			assert.isTrue(!called, "Unexpected surface.render() call in nested batch [1].");
			surface.closeBatch();
			assert.isTrue(called, "Surface.render() not called in nested batch.");
		},
		"Group batching": function () {
			var g = surface.createGroup();
			var ret = g.openBatch();
			assert.isTrue(ret === g, "Unexpected openBatch return value");
			var called = false;
			aspect.after(surface, "makeDirty", function () {
				called = true;
			});
			var rect = g.createRect();
			rect.fill = "red";
			assert.isTrue(!called, "Unexpected surface.render called.");
			g.closeBatch();
			assert.isTrue(called, "surface.render not called after group.closeBatch().");
		},
		"Nested Group/Surface batching": function () {
			surface.openBatch();
			var g = surface.createGroup();
			g.openBatch();
			var called = false;
			aspect.after(surface, "makeDirty", function () {
				called = true;
			});
			var rect = g.createRect();
			rect.fill = "red";
			assert.isTrue(!called, "Unexpected surface.render called.");
			g.closeBatch();
			assert.isTrue(!surface.pendingRender, "Unexpected surface.render called.");
			called = false;
			surface.closeBatch();
			assert.isTrue(called, "surface.render not called after group.closeBatch().");
		}
	});
});
