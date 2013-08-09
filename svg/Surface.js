define([
	"dojo/_base/declare",
	"dojo/dom",
	"../_base",
	"./_base",
	"../shape/Surface",
	"./Container",
	"./Creator"
], function(declare, dom, g, svg, baseSurface, Container, Creator){
	var svgSurface = declare([baseSurface, Container, Creator], {
		// summary:
		//		a surface object to be used for drawings (SVG)
		destroy: function(){
			// no need to call svg.Container.clear to remove the children raw
			// nodes since the surface raw node will be removed. So, only dispose at gfx level
			this.clear(true);
			this.defNode = null;	// release the external reference
			this.inherited(arguments);
		},
		setDimensions: function(width, height){
			// summary:
			//		sets the width and height of the rawNode
			// width: String
			//		width of surface, e.g., "100px"
			// height: String
			//		height of surface, e.g., "100px"
			if(!this.rawNode){ return this; }
			this.rawNode.setAttribute("width",  width);
			this.rawNode.setAttribute("height", height);
			// Fix for setDimension bug:
			// http://bugs.dojotoolkit.org/ticket/16100
			// (https://code.google.com/p/chromium/issues/detail?id=162628)
			var uagent = navigator.userAgent;
			var hasSvgSetAttributeBug = (function(){ var matches = /WebKit\/(\d*)/.exec(uagent); return matches ? matches[1] : 0})() > 534;
			if(hasSvgSetAttributeBug){
				this.rawNode.style.width =  width;
				this.rawNode.style.height =  height;
			}
			return this;	// self
		},
		getDimensions: function(){
			// summary:
			//		returns an object with properties "width" and "height"
			var t = this.rawNode ? {
				width:  g.normalizedLength(this.rawNode.getAttribute("width")),
				height: g.normalizedLength(this.rawNode.getAttribute("height"))} : null;
			return t;	// Object
		}
	});

	svgSurface.create = function(parentNode, width, height){
		// summary:
		//		creates a surface (SVG)
		// parentNode: Node
		//		a parent node
		// width: String|Number
		//		width of surface, e.g., "100px" or 100
		// height: String|Number
		//		height of surface, e.g., "100px" or 100
		// returns: gfx/shape.Surface
		//     newly created surface

		var s = new svgSurface();
		s.rawNode = svg._createElementNS(svg.xmlns.svg, "svg");
		s.rawNode.setAttribute("overflow", "hidden");
		if(width){
			s.rawNode.setAttribute("width",  width);
		}
		if(height){
			s.rawNode.setAttribute("height", height);
		}

		var defNode = svg._createElementNS(svg.xmlns.svg, "defs");
		s.rawNode.appendChild(defNode);
		s.defNode = defNode;

		s._parent = dom.byId(parentNode);
		s._parent.appendChild(s.rawNode);

		g._base._fixMsTouchAction(s);

		return s;	// gfx.Surface
	};

	return svgSurface;
});
