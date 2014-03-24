define([
	"dojo/_base/kernel", "dojo/_base/lang", "./_base", "dojo/_base/window", "dojo/_base/json", "dojo/_base/Deferred",
	"dojo/_base/sniff", "require", "dojo/_base/config", "dcl/dcl"
], function (kernel, lang, g, win, jsonLib, Deferred, has, require, config, dcl) {
	var gu = g.utils = {};

	var classesRequired, Surface, Group;

	function ensureClassesRequired() {
		if (!classesRequired) {
			try {
				Surface = require("./shape/_SurfaceBase");
			} catch (err) {
			}
			try {
				Group = require("./shape/_GroupBase");
			} catch (err) {
			}
			classesRequired = true;
		}
	}

	dcl.mix(gu, {
		forEach: function (/*gfx/shape.Surface|gfx/shape.Shape*/ object, /*Function|String|Array*/ f, /*Object?*/o
			) {
			// summary:
			//		Takes a shape or a surface and applies a function "f" to in the context of "o"
			//		(or global, if missing). If "shape" was a surface or a group, it applies the same
			//		function to all children recursively effectively visiting all shapes of the underlying scene
			//		graph.
			// object:
			//		The gfx container to iterate.
			// f:
			//		The function to apply.
			// o:
			//		The scope.

			ensureClassesRequired();

			o = o || kernel.global;
			f.call(o, object);
			if (dcl.isInstanceOf(object, Surface) || dcl.isInstanceOf(object, Group)) {
				object.children.forEach(function (shape) {
					gu.forEach(shape, f, o);
				});
			}
		},

		serialize: function (object) {
			// summary:
			//		Takes a shape or a surface and returns an object, which describes underlying shapes.
			// object: gfx/shape.Surface|gfx/shape.Shape
			//		The container to serialize.

			/* jshint maxcomplexity:12 */

			ensureClassesRequired();

			var t = {}, v, isSurface = dcl.isInstanceOf(object, Surface);
			if (isSurface || dcl.isInstanceOf(object, Group)) {
				t.children = object.children.map(gu.serialize);
				if (isSurface) {
					return t.children;	// Array
				}
			} else {
				t.shape = object.shape;
			}
			if (object.getTransform) {
				v = object.transform;
				if (v) {
					t.transform = v;
				}
			}
			if (object.getStroke) {
				v = object.stroke;
				if (v) {
					t.stroke = v;
				}
			}
			if (object.getFill) {
				v = object.fill;
				if (v) {
					t.fill = v;
				}
			}
			if (object.getFont) {
				v = object.font;
				if (v) {
					t.font = v;
				}
			}
			return t;	// Object
		},

		toJson: function (object, prettyPrint) {
			// summary:
			//		Works just like serialize() but returns a JSON string. If prettyPrint is true, the string is
			//		pretty-printed to make it more human-readable.
			// object: gfx/shape.Surface|gfx/shape.Shape
			//		The container to serialize.
			// prettyPrint: Boolean?
			//		Indicates whether the output string should be formatted.
			// returns: String

			return jsonLib.toJson(gu.serialize(object), prettyPrint);	// String
		},

		deserialize: function (parent, object) {
			// summary:
			//		Takes a surface or a shape and populates it with an object produced by serialize().
			// parent: gfx/shape.Surface|gfx/shape.Shape
			//		The destination container for the deserialized shapes.
			// object: gfx/shape.Shape|Array
			//		The shapes to deserialize.

			if (object instanceof Array) {
				return object.map(lang.hitch(null, gu.deserialize, parent));	// Array
			}
			var shape = ("shape" in object) ? parent.createShape(object.shape) : parent.createGroup();
			if ("transform" in object) {
				shape.transform = object.transform;
			}
			if ("stroke" in object) {
				shape.stroke = object.stroke;
			}
			if ("fill" in object) {
				shape.fill = object.fill;
			}
			if ("font" in object) {
				shape.font = object.font;
			}
			if ("children" in object) {
				object.children.forEach(lang.hitch(null, gu.deserialize, shape));
			}
			return shape;	// gfx/shape.Shape
		},

		fromJson: function (parent, json) {
			// summary:
			//		Works just like deserialize() but takes a JSON representation of the object.
			// parent: gfx/shape.Surface|gfx/shape.Shape
			//		The destination container for the deserialized shapes.
			// json: String
			//		The shapes to deserialize.

			return gu.deserialize(parent, jsonLib.fromJson(json));	// Array|gfx/shape.Shape
		},

		toSvg: function (/*gfx/shape.Surface*/surface) {
			// summary:
			//		Function to serialize a GFX surface to SVG text.
			// description:
			//		Function to serialize a GFX surface to SVG text.  The value of this output
			//		is that there are numerous serverside parser libraries that can render
			//		SVG into images in various formats.  This provides a way that GFX objects
			//		can be captured in a known format and sent serverside for serialization
			//		into an image.
			// surface:
			//		The GFX surface to serialize.
			// returns:
			//		Deferred object that will be called when SVG serialization is complete.

			//Since the init and even surface creation can be async, we need to
			//return a deferred that will be called when content has serialized.
			var deferred = new Deferred();

			if (g.renderer === "svg") {
				//If we're already in SVG mode, this is easy and quick.
				try {
					var svg = gu._cleanSvg(gu._innerXML(surface.rawNode));
					deferred.callback(svg);
				} catch (e) {
					deferred.errback(e);
				}
			} else {
				//Okay, now we have to get creative with hidden iframes and the like to
				//serialize SVG.
				if (!gu._initSvgSerializerDeferred) {
					gu._initSvgSerializer();
				}
				var jsonForm = gu.toJson(surface);
				var serializer = function () {
					try {
						var sDim = surface.getDimensions();
						var width = sDim.width;
						var height = sDim.height;

						//Create an attach point in the iframe for the contents.
						var node = gu._gfxSvgProxy.document.createElement("div");
						gu._gfxSvgProxy.document.body.appendChild(node);
						//Set the node scaling.
						win.withDoc(gu._gfxSvgProxy.document, function () {
							node.style.width = width + "px";
							node.style.height = height + "px";
						}, this);

						var proxyGfx = gu._gfxSvgProxy.require("gfx/gfx"); // will throw exception if not loaded

						//Create temp surface to render object to and render.
						var ts = proxyGfx.createSurface(node, width, height);

						//It's apparently possible that a suface creation is async, so we need to use
						//the whenLoaded function.  Probably not needed for SVG, but making it common
						var draw = function (surface) {
							try {
								proxyGfx.utils.fromJson(surface, jsonForm);

								//Get contents and remove temp surface.
								var svg = gu._cleanSvg(node.innerHTML);
								surface.clear();
								surface.destroy();
								gu._gfxSvgProxy.document.body.removeChild(node);
								deferred.callback(svg);
							} catch (e) {
								deferred.errback(e);
							}
						};
						ts.whenLoaded(null, draw);
					} catch (ex) {
						deferred.errback(ex);
					}
				};
				//See if we can call it directly or pass it to the deferred to be
				//called on initialization.
				if (gu._initSvgSerializerDeferred.fired > 0) {
					serializer();
				} else {
					gu._initSvgSerializerDeferred.addCallback(serializer);
				}
			}
			return deferred; //dojo.Deferred that will be called when serialization finishes.
		},

		//iFrame document used for handling SVG serialization.
		_gfxSvgProxy: null,

		//Serializer loaded.
		_initSvgSerializerDeferred: null,

		_svgSerializerInitialized: function () {
			// summary:
			//		Internal function to call when the serializer init completed.
			// tags:
			//		private
			gu._initSvgSerializerDeferred.callback(true);
		},

		_initSvgSerializer: function () {
			// summary:
			//		Internal function to initialize the hidden iframe where SVG rendering
			//		will occur.
			// tags:
			//		private
			if (!gu._initSvgSerializerDeferred) {
				gu._initSvgSerializerDeferred = new Deferred();
				var f = win.doc.createElement("iframe");
				f.style.display = "none";
				f.style.position = "absolute";
				f.style.width = "1em";
				f.style.height = "1em";
				f.style.top = "-10000px";
				if (has("ie")) {
					f.onreadystatechange = function () {
						if (f.contentWindow.document.readyState === "complete") {
							f.onreadystatechange = function () {
							};
							f.contentWindow.require(["gfx/utils"], function (/*fgu*/) {
								gu._gfxSvgProxy = f.contentWindow;
								gu._svgSerializerInitialized();
							});
						}
					};
				} else {
					f.onload = function () {
						f.onload = function () {
						};
						f.contentWindow.require(["gfx/utils"], function (/*fgu*/) {
							console.log("INITED");
							gu._gfxSvgProxy = f.contentWindow;
							gu._svgSerializerInitialized();
						});
					};
				}
				//We have to load the GFX SVG proxy frame.  Default is to use the one packaged in gfx.
				var uri = (config.gfxSvgProxyFrameUrl || require.toUrl("gfx/resources/gfxSvgProxyFrame.html"));
				f.setAttribute("src", uri.toString());
				win.body().appendChild(f);
			}
		},

		_innerXML: function (/*Node*/node) {
			// summary:
			//		Implementation of MS's innerXML function.
			// node:
			//		The node from which to generate the XML text representation.
			// tags:
			//		private
			if (node.innerXML) {
				return node.innerXML;	//String
			} else if (node.xml) {
				return node.xml;		//String
			} else if (typeof XMLSerializer !== "undefined") {
				return (new XMLSerializer()).serializeToString(node);	//String
			}
			return null;
		},

		_cleanSvg: function (svg) {
			// summary:
			//		Internal function that cleans up artifacts in extracted SVG content.
			// tags:
			//		private
			if (svg) {
				//Make sure the namespace is set.
				if (svg.indexOf("xmlns=\"http://www.w3.org/2000/svg\"") === -1) {
					svg = svg.substring(4, svg.length);
					svg = "<svg xmlns=\"http://www.w3.org/2000/svg\"" + svg;
				}
				//Same for xmlns:xlink (missing in Chrome and Safari)
				if (svg.indexOf("xmlns:xlink=\"http://www.w3.org/1999/xlink\"") === -1) {
					svg = svg.substring(4, svg.length);
					svg = "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\"" + svg;
				}
				//and add namespace to href attribute if not done yet
				//(FF 5+ adds xlink:href but not the xmlns def)
				if (svg.indexOf("xlink:href") === -1) {
					svg = svg.replace(/href\s*=/g, "xlink:href=");
				}
				// in IE, <image are serialized as <img>
				svg = svg.replace(/<img\b([^>]*)>/gi, "<image $1 />");
				//Do some other cleanup, like stripping out the
				//dojoGfx attributes and quoting ids.
				svg = svg.replace(/\bdojoGfx\w*\s*=\s*(['"])\w*\1/g, "");
				svg = svg.replace(/\b__gfxObject__\s*=\s*(['"])\w*\1/g, "");
				svg = svg.replace(/[=]([^"']+?)(\s|>)/g, "=\"$1\"$2");
			}
			return svg;  //Cleaned SVG text.
		}
	});

	return gu;
});
