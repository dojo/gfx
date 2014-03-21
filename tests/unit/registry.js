define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/registry"
], function (require, registerSuite, assert, tu, gfx, registry) {

	var surface;

	tu.registerSuite({
		name: "Registry",
		setup: function () {
			surface = tu.createSurface(800, 600);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"gfx.registry.register": function () {
			var obj = {
				declaredClass: "module.sub.foo"
			};
			// register
			var id = registry.register(obj);
			assert.isTrue(typeof id === "string" && id.length > 0, "checking register() return value.");
			var ret = registry.byId(id);
			assert.isTrue(ret === obj, "Checking byId() after register().");
			var obj2 = {declaredClass: "module.sub.foo"};
			var ret2 = registry.register(obj2);
			assert.isTrue(typeof ret2 === "string" && ret2.length > 0, "checking register() with same declaredClass.");
			assert.isTrue(ret2 !== id, "checking _uid unicity.");
			//dispose
			obj.getUID = function () {
				return id;
			};
			registry.dispose(obj);
			ret = registry.byId(id);
			assert.isTrue(!ret, "Checking gfx.registry.dispose().");
			// optional recursive dispose

		},
		"recursive dispose": function () {

			var obj = {
				declaredClass: "module.sub.foo",
				children: [
					{ declaredClass: "foo.bar" },
					{ declaredClass: "bar.foo" }
				]
			};
			var id1 = registry.register(obj);
			obj.getUID = function () {
				return id1;
			};
			var id2 = registry.register(obj.children[0]);
			obj.children[0].getUID = function () {
				return id2;
			};
			var id3 = registry.register(obj.children[1]);
			obj.children[1].getUID = function () {
				return id3;
			};
			registry.dispose(obj, true);
			var ret = registry.byId(id1);
			assert.isTrue(!ret, "Shape id1 not disposed (recursive dispose).");
			ret = registry.byId(id2);
			assert.isTrue(!ret, "Child id2 not disposed (recursive dispose).");
			ret = registry.byId(id3);
			assert.isTrue(!ret, "Child id3 not disposed (recursive dispose).");
		},
		"shape registration": function () {
			var dic = {};
			[
				"Group", "Rect", "Ellipse", "Circle", "Line", "Polyline", "Image", "Text", "Path", "TextPath"
			].forEach(function (name) {
					var s = surface["create" + name]();
					assert.isTrue(s.getUID() && s.getUID().length > 0,
						"Checking automatic shape registration for " + name);
					var o = registry.byId(s.getUID());
					assert.isTrue(o === s, "Checking gfx.registry.byId()");
					// rawNode binding
					if (s.rawNode) {
						var p = s.rawNode.tag ? "tag" : "_gfxObject";
						assert.isTrue(s.rawNode[p] === s, "Checking rawNode<->gfx binding.");
					}
					dic[name] = s.getUID();
				});
			// successive registration
			[
				"Group", "Rect", "Ellipse", "Circle", "Line", "Polyline", "Image", "Text", "Path", "TextPath"
			].forEach(function (name) {
					var s = surface["create" + name]();
					var id = s.getUID();
					assert.isTrue(dic[name] !== id, "Checking unicity.");
				});
		}
	});
});
