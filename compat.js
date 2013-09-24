define(["dojo/_base/lang", "dojo/_base/array", "./_base", "./_RendererChooser!Surface", "./shapes"],
	function(lang, arr, g, Surface, shapes){
		// module:
		//		gfx/compat
		// summary:
		//		This the root of the Dojo Graphics packageThis module mimics the Dojo 1.9 API by adding a createSurface on the toplevel gfx module.
		//		It also requires all the shape classes (Rect, etc) and adds them to the toplevel gfx object (e.g. g.Rect).
		//		This module may be removed before 2.0 is released.

		g.Surface = Surface;
		lang.mixin(g, shapes);
		g.createSurface = function(parent, width, height){
			return new g.Surface(parent, width, height);
		};

		g.switchTo = function(/*String|Object*/renderer){
			// summary:
			//		switch the graphics implementation to the specified renderer.
			// renderer:
			//		Either the string name of a renderer (eg. 'canvas', 'svg, ...) or the renderer
			//		object to switch to.

			function get(r){
				try{
					return g[r] || require("gfx/" + r);
				}catch(err){
				}
			}

			var ns = typeof renderer == "string" ? get(renderer) : renderer;
			if(ns){
				// If more options are added, update the docblock at the end of shape.js!
				arr.forEach(["Group", "Rect", "Ellipse", "Circle", "Line",
					"Polyline", "Image", "Text", "Path", "TextPath",
					"Surface", "fixTarget"], function(name){
					g[name] = ns[name];
				});

				if(typeof renderer == "string"){
					g.renderer = renderer;
				}else{
					arr.some(["svg", "canvas", "canvasWithEvents"], function(r){
						return (g.renderer = get(r) && get(r).Surface === g.Surface ? r : null);
					});
				}
			}
		};

		return g;
	});
