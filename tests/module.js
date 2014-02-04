define([
	"doh/runner", "require", "./matrix", "./decompose"
], function (doh, require) {
	doh.registerUrl("GFX: Utils", require.toUrl("./test_utils.html"), 3600000);
	doh.registerUrl("GFX: Base", require.toUrl("./test_base.html"), 3600000);
	doh.registerUrl("GFX: Clean up", require.toUrl("./test_lifecycle.html"), 3600000);
	doh.registerUrl("GFX: Container bbox", require.toUrl("./test_containerBBox.html"), 3600000);
	doh.registerUrl("GFX: Text bbox", require.toUrl("./test_textbbox.html"), 3600000);
	doh.registerUrl("GFX: Batch API", require.toUrl("./test_batch.html"), 3600000);
	doh.registerUrl("GFX: switchTo", require.toUrl("./test_switchTo.html"), 3600000);
});

