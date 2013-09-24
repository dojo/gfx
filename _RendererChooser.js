define(["./_base"], function(g){
	return {
		// summary:
		//		This module is an AMD loader plugin that loads the appropriate GFX shape class
		//		based on has("gfx-*") flags:

		load: function(id, require, load){
			// tags:
			//      private

			var renderer = g._base._chooseRenderer();

			require(["gfx/" + renderer + "/" + id], function(module){
				load(module);
			});
		}
	};
});
