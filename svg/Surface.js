define([
	"require", "dcl/dcl", "dojo/dom", "../_base", "./_base", "../shape/_SurfaceBase", "./Container", "./Creator",
	"dojo/has", "dojo/has!dojo-bidi?./bidi/Surface"
], function (require, dcl, dom, g, svg, SurfaceBase, Container, Creator, has, BidiSurface) {

	var cc = {};

	var Surface = dcl([SurfaceBase, Container, Creator], {
		// summary:
		//		a surface object to be used for drawings (SVG)

		constructor: function (parentNode, width, height) {
			// summary:
			//		creates a surface (SVG)
			// parentNode: Node
			//		a parent node
			// width: String|Number
			//		width of surface, e.g., "100px" or 100
			// height: String|Number
			//		height of surface, e.g., "100px" or 100

			this.rawNode = svg._createElementNS(svg.xmlns.svg, "svg");
			this.rawNode.setAttribute("overflow", "hidden");
			if (width) {
				this.rawNode.setAttribute("width", width);
			}
			if (height) {
				this.rawNode.setAttribute("height", height);
			}

			var defNode = svg._createElementNS(svg.xmlns.svg, "defs");
			this.rawNode.appendChild(defNode);
			this.defNode = defNode;

			this._parent = dom.byId(parentNode);
			this._parent.appendChild(this.rawNode);

			g._fixTouchAction(this);
		},

		destroy: dcl.superCall(function (sup) {
			return function () {
				// no need to call svg.Container.clear to remove the children raw
				// nodes since the surface raw node will be removed. So, only dispose at gfx level
				this.clear(true);
				this.defNode = null;	// release the external reference
				sup.apply(this, arguments);
			};
		}),
		setDimensions: function (width, height) {
			// summary:
			//		sets the width and height of the rawNode
			// width: String
			//		width of surface, e.g., "100px"
			// height: String
			//		height of surface, e.g., "100px"
			if (!this.rawNode) {
				return this;
			}
			this.rawNode.setAttribute("width", width);
			this.rawNode.setAttribute("height", height);
			// Fix for setDimension bug:
			// http://bugs.dojotoolkit.org/ticket/16100
			// (https://code.google.com/p/chromium/issues/detail?id=162628)
			var uagent = navigator.userAgent;
			var hasSvgSetAttributeBug = (function () {
				var matches = /WebKit\/(\d*)/.exec(uagent);
				return matches ? matches[1] : 0;
			})() > 534;
			if (hasSvgSetAttributeBug) {
				this.rawNode.style.width = width;
				this.rawNode.style.height = height;
			}
			return this;	// self
		},
		getDimensions: function () {
			// summary:
			//		returns an object with properties "width" and "height"
			return this.rawNode ? {
				width: g.normalizedLength(this.rawNode.getAttribute("width")),
				height: g.normalizedLength(this.rawNode.getAttribute("height"))
			} : null; // Object
		},

		// SVG masks handling

		createMask: dcl.superCall(function (sup) {
			return function (arg) {
				// summary:
				//		creates an SVG mask shape
				var n = "./Mask";
				return this.createObject(cc[n] || (cc[n] = require(n)), arg);
			};
		}),
		createShape: dcl.superCall(function (sup) {
			return function (shape) {
				if (shape.type === "mask") {
					return this.createMask(shape);
				}
				return sup.apply(this, arguments);
			};
		}),
		add: dcl.superCall(function (sup) {
			return function (shape) {
				if (shape.shape.type === "mask") {
					this.defNode.appendChild(shape.rawNode);
					shape.parent = this;
				} else {
					sup.apply(this, arguments);
				}
			};
		}),
		remove: dcl.superCall(function (sup) {
			return function (shape) {
				if (shape.shape.type === "mask" && this.defNode === shape.rawNode.parentNode) {
					this.defNode.removeChild(shape.rawNode);
					shape.parent = null;
				} else {
					sup.apply(this, arguments);
				}
			};
		}),
	});
	return has("dojo-bidi") ? dcl([Surface, BidiSurface], {}) : Surface;
});
