define([
	"doh/runner", "require"
], function (doh, require) {
	doh.registerUrl("gfx.tests.bidi.test_SurfaceGroup", require.toUrl("./test_SurfaceGroup.html"));
	doh.registerUrl("gfx.tests.bidi.canvas.test_SurfaceGroup", require.toUrl("./canvas/test_SurfaceGroupCanvas.html"));
});
