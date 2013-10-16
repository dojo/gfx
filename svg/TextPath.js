define([
	"dojo/_base/declare",
	"../_base",
	"./_base",
	"./Shape",
	"../shape/TextPath",
	"./Font"
], function(declare, g, svg, SvgShape, BaseTextPath, Font){
	var TextPath = declare([SvgShape, BaseTextPath, Font], {
		// summary:
		//		a textpath shape (SVG)
		_updateWithSegment: function(segment){
			// summary:
			//		updates the bounding box of path with new segment
			// segment: Object
			//		a segment
			this.inherited(arguments);
			this._setTextPath();
		},
		setShape: function(newShape){
			// summary:
			//		forms a path using a shape (SVG)
			// newShape: Object
			//		an SVG path string or a path object (see gfx.defaultPath)
			this.inherited(arguments);
			this._setTextPath();
			return this;	// self
		},
		_setTextPath: function(){
			if(typeof this.shape.path != "string"){ return; }
			var r = this.rawNode;
			if(!r.firstChild){
				var tp = svg._createElementNS(svg.xmlns.svg, "textPath"),
					tx = svg._createTextNode("");
				tp.appendChild(tx);
				r.appendChild(tp);
			}
			var ref  = r.firstChild.getAttributeNS(svg.xmlns.xlink, "href"),
				path = ref && svg.getRef(ref);
			if(!path){
				var surface = this._getParentSurface();
				if(surface){
					var defs = surface.defNode;
					path = svg._createElementNS(svg.xmlns.svg, "path");
					var id = g._base._getUniqueId();
					path.setAttribute("id", id);
					defs.appendChild(path);
					svg._setAttributeNS(r.firstChild, svg.xmlns.xlink, "xlink:href", "#" + id);
				}
			}
			if(path){
				path.setAttribute("d", this.shape.path);
			}
		},
		_setText: function(){
			var r = this.rawNode;
			if(!r.firstChild){
				var tp = svg._createElementNS(svg.xmlns.svg, "textPath"),
					tx = svg._createTextNode("");
				tp.appendChild(tx);
				r.appendChild(tp);
			}
			r = r.firstChild;
			var t = this.textPath;
			r.setAttribute("alignment-baseline", "middle");
			switch(t.align){
				case "middle":
					r.setAttribute("text-anchor", "middle");
					r.setAttribute("startOffset", "50%");
					break;
				case "end":
					r.setAttribute("text-anchor", "end");
					r.setAttribute("startOffset", "100%");
					break;
				default:
					r.setAttribute("text-anchor", "start");
					r.setAttribute("startOffset", "0%");
					break;
			}
			//r.parentNode.setAttribute("alignment-baseline", "central");
			//r.setAttribute("dominant-baseline", "central");
			r.setAttribute("baseline-shift", "0.5ex");
			r.setAttribute("text-decoration", t.decoration);
			r.setAttribute("rotate", t.rotated ? 90 : 0);
			r.setAttribute("kerning", t.kerning ? "auto" : 0);
			r.firstChild.data = t.text;
		}
	});
	TextPath.nodeType = "text";
	return TextPath;
});
