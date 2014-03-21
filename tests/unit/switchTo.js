define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/svg", "gfx/canvas"
], function (require, registerSuite, assert, tu, gfx) {

	function get(r) {
		try {
			return gfx[r] || require("gfx/" + r);
		} catch (err) {
		}
	}

	tu.registerSuite({
		name: "Compatibility with 1.X",
		"switchTo(object)": function () {
			var rname = tu.renderer === "svg" ? "canvas" : "svg";
			var r = get(rname);
			gfx.switchTo(r);
			assert.equal(gfx.Surface, r.Surface, "Unexpected Surface type");
			assert.equal(gfx.renderer, rname, "Unexpected renderer");

		},
		"switchTo(string)": function () {
			var r = tu.renderer === "svg" ? "canvas" : "svg";
			gfx.switchTo(r);
			assert.equal(gfx.Surface, get(r).Surface, "Unexpected Surface type");
			assert.equal(gfx.renderer, r, "Unexpected renderer");
		}
	});
});
