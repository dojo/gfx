define(["dcl/dcl", "./_base", "./Surface", "./shapes", "require", "./shape/_ShapeBase"],
	function(dcl, g, Surface, shapes, require, ShapeBase){
		// module:
		//		gfx/compat
		// summary:
		//		This the root of the Dojo Graphics packageThis module mimics the Dojo 1.9 API by adding a createSurface on the toplevel gfx module.
		//		It also requires all the shape classes (Rect, etc) and adds them to the toplevel gfx object (e.g. g.Rect).
		//		This module may be removed before 2.0 is released.

		g.Surface = Surface;
		dcl.mix(g, shapes);
		g.createSurface = function(parent, width, height, arg){
			// summary:
			//		Creates a new drawing surface using the renderer defined by the "gfx-renderer" has flag.
			return new g.Surface(parent, width, height, arg);
		};
		g.renderer = g._chooseRenderer();

		// Default shapes are now defined in each shape base class,
		// for compat copy them to the toplevel gfx object.
		for(var name in shapes){
			if(shapes.hasOwnProperty(name)){
				try{
					g["default" + name] = require("./shape/_" + name + "Base").defaultShape;
				}catch(err){
				}
			}
		}

		g.switchTo = function(/*String|Object*/renderer){
			// summary:
			//		switch the graphics implementation to the specified renderer.
			// renderer:
			//		Either the string name of a renderer (eg. 'canvas', 'svg', ...) or the renderer
			//		object to switch to.

			var ns;

			if(typeof renderer == "string"){
				ns = g[renderer];
				if(!ns){
					try{
						// e.g. "canvas" -> gfx/canvas
						// e.g. gfxext/canvasWithEvents
						ns = require((renderer.indexOf("/") > 0 ? "" : "./") + renderer);
					}catch(err){
					}
				}
			}else{
				ns = renderer;
			};
			if(ns){
				// If more options are added, update the docblock at the end of shape.js!
				["Group", "Rect", "Ellipse", "Circle", "Line",
					"Polyline", "Image", "Text", "Path", "TextPath",
					"Surface"].forEach(function(name){
					g[name] = ns[name];
				});

				if(typeof renderer == "string"){
					g.renderer = renderer;
				}else{
					g.renderer = ns.id;
				}
			}
		};

		return g;
	});
