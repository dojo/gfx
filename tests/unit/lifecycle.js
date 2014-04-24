define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/registry", "gfx/svg", "gfx/canvas"
], function (registerSuite, assert, tu, gfx, registry) {
	var surface, r, p;
	tu.registerSuite({
		name: "GFX shape lifecycle",
		setup: function () {
			surface = tu.createSurface(300, 300);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		afterEach: function () {
			surface.clear();
		},
		"Shape.destroy": function () {
			r = surface.createRect({
				x: 100,
				y: 100
			});
			r.fill = "black";

			var uid = r.getUID();
			r.removeShape();
			r.destroy();
			assert.isTrue(!registry.byId(uid), "Unexpected shape.byId return value.");
		},
		"Group.clear": function () {
			r = surface.createGroup();
			r.createRect({
				x: 100,
				y: 100
			});
			r.fill = "black";

			var c = r.children[0];
			r.clear(true);
			assert.isTrue(r.children.length === 0, "Unexpected children length on disposed group.");
			assert.isTrue(!registry.byId(c.getUID()), "Unexpected shape.byId return value.");
		},
		"Group.destroy": function () {
			r = surface.createGroup();
			r.createRect({
				x: 100,
				y: 100
			});
			r.fill = "black";

			var uid = r.getUID();
			var c = r.children[0];
			r.removeShape();
			r.destroy();
			assert.isTrue(!registry.byId(uid), "Unexpected shape.byId return value.");
			assert.isTrue(r.children.length === 0, "Unexpected children length on disposed group.");
			assert.isTrue(!registry.byId(r.getUID()), "Unexpected shape.byId return value.");

			r = surface.createGroup();
			var t2 = r.createGroup();
			c = t2.createRect();
			r.removeShape();
			r.destroy();
			assert.isTrue(!registry.byId(r.getUID()), "Unexpected shape.byId return value.");
			assert.isTrue(r.children.length === 0, "Unexpected children length on disposed group.");
			assert.isTrue(!registry.byId(t2.getUID()), "Unexpected shape.byId return value.");
			assert.isTrue(t2.children.length === 0, "Unexpected children length on disposed group.");
			assert.isTrue(!registry.byId(c.getUID()), "Unexpected shape.byId return value.");
		}
	});

	registerSuite({
		name: "SVG-specific : shape clean-up",
		setup: function () {
			surface = tu.createSurface(300, 300, "svg");
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		afterEach: function () {
			surface.clear();
		},
		"shape cleanup": function () {
			var grad = {
				type: "linear",
				x1: 0,
				y1: 0,
				x2: 600,
				y2: 0,
				colors: [
					{ offset: 0.2, color: "red" },
					{ offset: 0.8, color: "yellow" }
				]
			};
			r = surface.createRect();
			r.fill = grad;
			r.clip = {x: 0, y: 0, width: 300, height: 300};

			var defs = surface.defNode;
			assert.isTrue(defs.childNodes.length === 1, "Unexpected defs children count.");
			var c = surface.children[0];
			c.removeShape();
			c.destroy();
			assert.isTrue(defs.childNodes.length === 0, "Unexpected defs children count. Expected: 0.");
			assert.isTrue(surface.rawNode.childNodes.length === 1 && surface.rawNode.childNodes[0] === defs,
				"Unexpected surface children nodes.");

		},
		"group cleanup": function () {
			var grad = {
				type: "linear",
				x1: 0,
				y1: 0,
				x2: 600,
				y2: 0,
				colors: [
					{ offset: 0.2, color: "red" },
					{ offset: 0.8, color: "yellow" }
				]
			};
			var sub1 = surface.createGroup();
			for (var i = 0; i < 100; ++i) {
				var r = Math.floor(i / 10), offs = 4, cc = r % 2 === 0 ? -offs : offs, x = (i % 10) * 60 + cc, y = r *
					60 + 5, w = 50, h = 50;
				var rect = sub1.createRect({x: x, y: y, width: w, height: h});
				rect.fill = grad;
				rect.clip = {cx: x + w / 2, cy: y + w / 2, rx: 20, ry: 20};
			}

			var defs = surface.defNode;
			assert.isTrue(defs.childNodes.length === 100, "Unexpected defs children count.");
			var g = surface.children[0];
			g.clear(true);
			assert.isTrue(defs.childNodes.length === 0, "Unexpected defs children count. Expected: 0.");
			assert.isTrue(g.rawNode.firstChild === null, "Unexpected group children count. Expected: 0.");
		},
	});

	registerSuite({
		name: "Canvas-specific : http://bugs.dojotoolkit.org/ticket/17077",
		setup: function () {
			surface = tu.createSurface(300, 300, "canvas");
			p = surface._parent;
		},
		teardown: function () {
			while (p.parentNode !== document.body) {
				p = p.parentNode;
			}
			document.body.removeChild(p);
		},
		"canvas": function () {
			surface.createGroup();
			var sg = surface.createGroup();
			sg.createRect();
			// flush pending makeDirty()
			surface._render();

			var d = this.async(10000);
			surface._render = d.callback(surface._render);

			sg.removeShape();
			surface.destroy();

			return d;
		}
	});
});
