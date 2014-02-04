define(["./_base"], function (g) {
	return {
		// summary:
		//		This module is an AMD loader plugin that loads the appropriate GFX shape class
		//		based on has("gfx-*") flags:

		load: function (id, require, load) {
			// tags:
			//      private

			var r = g._chooseRenderer();

			// If r contains a slash it is assumed to be an absolute module id,
			// otherwise it is assumed to be a renderer id (e.g. "svg" or "canvas")
			// so we add "./" in front of it to get it relative to the GFX base.
			require([(r.indexOf("/") > 0 ? "" : "./") + r + "/" + id], function (module) {
				load(module);
			});
		}
	};
});
