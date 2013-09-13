define([
	"dojo/_base/lang",
	"dojo/dom",
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom-geometry",
	"dojo/dom-attr",
	"dojo/_base/Color",
	"../_base",
	"./_base",
	"../shape/Shape",
	"./Surface"
], function(lang, dom, declare, arr, domGeom, domAttr, Color, g, svg, baseShape, svgSurface){

	var clipCount = 0;

	return declare(baseShape, {
		// summary:
		//		SVG-specific implementation of gfx/shape.Shape methods

		destroy: function(){
			if(this.fillStyle && "type" in this.fillStyle){
				var fill = this.rawNode.getAttribute("fill"),
					ref = svg.getRef(fill);
				if(ref){
					ref.parentNode.removeChild(ref);
				}
			}
			if(this.clip){
				var clipPathProp = this.rawNode.getAttribute("clip-path");
				if(clipPathProp){
					var clipNode = dom.byId(clipPathProp.match(/gfx_clip[\d]+/)[0]);
					if(clipNode){
						clipNode.parentNode.removeChild(clipNode);
					}
				}
			}
			this.inherited(arguments);
		},

		setFill: function(fill){
			// summary:
			//		sets a fill object (SVG)
			// fill: Object
			//		a fill object
			//		(see gfx.defaultLinearGradient,
			//		gfx.defaultRadialGradient,
			//		gfx.defaultPattern,
			//		or dojo/_base/Color)

			if(!fill){
				// don't fill
				this.fillStyle = null;
				this.rawNode.setAttribute("fill", "none");
				this.rawNode.setAttribute("fill-opacity", 0);
				return this;
			}
			var f;
			// FIXME: slightly magical. We're using the outer scope's "f", but setting it later
			var setter = function(x){
				// we assume that we're executing in the scope of the node to mutate
				this.setAttribute(x, f[x].toFixed(8));
			};
			if(typeof(fill) == "object" && "type" in fill){
				// gradient
				switch(fill.type){
					case "linear":
						f = g.makeParameters(g.defaultLinearGradient, fill);
						var gradient = this._setFillObject(f, "linearGradient");
						arr.forEach(["x1", "y1", "x2", "y2"], setter, gradient);
						break;
					case "radial":
						f = g.makeParameters(g.defaultRadialGradient, fill);
						var grad = this._setFillObject(f, "radialGradient");
						arr.forEach(["cx", "cy", "r"], setter, grad);
						break;
					case "pattern":
						f = g.makeParameters(g.defaultPattern, fill);
						var pattern = this._setFillObject(f, "pattern");
						arr.forEach(["x", "y", "width", "height"], setter, pattern);
						break;
				}
				this.fillStyle = f;
				return this;
			}
			// color object
			f = g.normalizeColor(fill);
			this.fillStyle = f;
			this.rawNode.setAttribute("fill", f.toCss());
			this.rawNode.setAttribute("fill-opacity", f.a);
			this.rawNode.setAttribute("fill-rule", "evenodd");
			return this;	// self
		},

		setStroke: function(stroke){
			// summary:
			//		sets a stroke object (SVG)
			// stroke: Object
			//		a stroke object (see gfx.defaultStroke)

			var rn = this.rawNode;
			if(!stroke){
				// don't stroke
				this.strokeStyle = null;
				rn.setAttribute("stroke", "none");
				rn.setAttribute("stroke-opacity", 0);
				return this;
			}
			// normalize the stroke
			if(typeof stroke == "string" || lang.isArray(stroke) || stroke instanceof Color){
				stroke = { color: stroke };
			}
			var s = this.strokeStyle = g.makeParameters(g.defaultStroke, stroke);
			s.color = g.normalizeColor(s.color);
			// generate attributes
			if(s){
				rn.setAttribute("stroke", s.color.toCss());
				rn.setAttribute("stroke-opacity", s.color.a);
				rn.setAttribute("stroke-width", s.width);
				rn.setAttribute("stroke-linecap", s.cap);
				if(typeof s.join == "number"){
					rn.setAttribute("stroke-linejoin", "miter");
					rn.setAttribute("stroke-miterlimit", s.join);
				}else{
					rn.setAttribute("stroke-linejoin", s.join);
				}
				var da = s.style.toLowerCase();
				if(da in svg.dasharray){
					da = svg.dasharray[da];
				}
				if(da instanceof Array){
					da = lang._toArray(da);
					var i;
					for(i = 0; i < da.length; ++i){
						da[i] *= s.width;
					}
					if(s.cap != "butt"){
						for(i = 0; i < da.length; i += 2){
							da[i] -= s.width;
							if(da[i] < 1){
								da[i] = 1;
							}
						}
						for(i = 1; i < da.length; i += 2){
							da[i] += s.width;
						}
					}
					da = da.join(",");
				}
				rn.setAttribute("stroke-dasharray", da);
				rn.setAttribute("dojoGfxStrokeStyle", s.style);
			}
			return this;	// self
		},

		_getParentSurface: function(){
			var surface = this.parent;
			for(; surface && !(surface instanceof svgSurface); surface = surface.parent);
			return surface;
		},

		_setFillObject: function(f, nodeType){
			var svgns = svg.xmlns.svg;
			this.fillStyle = f;
			var surface = this._getParentSurface(),
				defs = surface.defNode,
				fill = this.rawNode.getAttribute("fill"),
				ref = svg.getRef(fill);
			if(ref){
				fill = ref;
				if(fill.tagName.toLowerCase() != nodeType.toLowerCase()){
					var id = fill.id;
					fill.parentNode.removeChild(fill);
					fill = svg._createElementNS(svgns, nodeType);
					fill.setAttribute("id", id);
					defs.appendChild(fill);
				}else{
					while(fill.childNodes.length){
						fill.removeChild(fill.lastChild);
					}
				}
			}else{
				fill = svg._createElementNS(svgns, nodeType);
				fill.setAttribute("id", g._base._getUniqueId());
				defs.appendChild(fill);
			}
			if(nodeType == "pattern"){
				fill.setAttribute("patternUnits", "userSpaceOnUse");
				var img = svg._createElementNS(svgns, "image");
				img.setAttribute("x", 0);
				img.setAttribute("y", 0);
				img.setAttribute("width", f.width.toFixed(8));
				img.setAttribute("height", f.height.toFixed(8));
				svg._setAttributeNS(img, svg.xmlns.xlink, "xlink:href", f.src);
				fill.appendChild(img);
			}else{
				fill.setAttribute("gradientUnits", "userSpaceOnUse");
				for(var i = 0; i < f.colors.length; ++i){
					var c = f.colors[i], t = svg._createElementNS(svgns, "stop"),
						cc = c.color = g.normalizeColor(c.color);
					t.setAttribute("offset", c.offset.toFixed(8));
					t.setAttribute("stop-color", cc.toCss());
					t.setAttribute("stop-opacity", cc.a);
					fill.appendChild(t);
				}
			}
			this.rawNode.setAttribute("fill", "url(#" + fill.getAttribute("id") + ")");
			this.rawNode.removeAttribute("fill-opacity");
			this.rawNode.setAttribute("fill-rule", "evenodd");
			return fill;
		},

		_applyTransform: function(){
			var matrix = this.matrix;
			if(matrix){
				var tm = this.matrix;
				this.rawNode.setAttribute("transform", "matrix(" +
					tm.xx.toFixed(8) + "," + tm.yx.toFixed(8) + "," +
					tm.xy.toFixed(8) + "," + tm.yy.toFixed(8) + "," +
					tm.dx.toFixed(8) + "," + tm.dy.toFixed(8) + ")");
			}else{
				this.rawNode.removeAttribute("transform");
			}
			return this;
		},

		setRawNode: function(rawNode){
			// summary:
			//		assigns and clears the underlying node that will represent this
			//		shape. Once set, transforms, gradients, etc, can be applied.
			//		(no fill & stroke by default)
			var r = this.rawNode = rawNode;
			if(this.shape.type != "image"){
				r.setAttribute("fill", "none");
			}
			r.setAttribute("fill-opacity", 0);
			r.setAttribute("stroke", "none");
			r.setAttribute("stroke-opacity", 0);
			r.setAttribute("stroke-width", 1);
			r.setAttribute("stroke-linecap", "butt");
			r.setAttribute("stroke-linejoin", "miter");
			r.setAttribute("stroke-miterlimit", 4);
			// Bind GFX object with SVG node for ease of retrieval - that is to
			// save code/performance to keep this association elsewhere
			r.__gfxObject__ = this;
		},

		setShape: function(newShape){
			// summary:
			//		sets a shape object (SVG)
			// newShape: Object
			//		a shape object
			//		(see gfx.defaultPath,
			//		gfx.defaultPolyline,
			//		gfx.defaultRect,
			//		gfx.defaultEllipse,
			//		gfx.defaultCircle,
			//		gfx.defaultLine,
			//		or gfx.defaultImage)
			this.shape = g.makeParameters(this.shape, newShape);
			for(var i in this.shape){
				if(i != "type"){
					this.rawNode.setAttribute(i, this.shape[i]);
				}
			}
			this.bbox = null;
			return this;	// self
		},

		// move family

		_moveToFront: function(){
			// summary:
			//		moves a shape to front of its parent's list of shapes (SVG)
			this.rawNode.parentNode.appendChild(this.rawNode);
			return this;	// self
		},
		_moveToBack: function(){
			// summary:
			//		moves a shape to back of its parent's list of shapes (SVG)
			this.rawNode.parentNode.insertBefore(this.rawNode, this.rawNode.parentNode.firstChild);
			return this;	// self
		},
		setClip: function(clip){
			// summary:
			//		sets the clipping area of this shape.
			// description:
			//		This method overrides the gfx/shape.Shape.setClip() method.
			// clip: Object
			//		an object that defines the clipping geometry, or null to remove clip.
			this.inherited(arguments);
			var clipType = clip ? "width" in clip ? "rect" :
				"cx" in clip ? "ellipse" :
					"points" in clip ? "polyline" : "d" in clip ? "path" : null : null;
			if(clip && !clipType){
				return this;
			}
			if(clipType === "polyline"){
				clip = lang.clone(clip);
				clip.points = clip.points.join(",");
			}
			var clipNode, clipShape,
				clipPathProp = domAttr.get(this.rawNode, "clip-path");
			if(clipPathProp){
				clipNode = dom.byId(clipPathProp.match(/gfx_clip[\d]+/)[0]);
				if(clipNode){ // may be null if not in the DOM anymore
					clipNode.removeChild(clipNode.childNodes[0]);
				}
			}
			if(clip){
				if(clipNode){
					clipShape = svg._createElementNS(svg.xmlns.svg, clipType);
					clipNode.appendChild(clipShape);
				}else{
					var idIndex = ++clipCount;
					var clipId = "gfx_clip" + idIndex;
					var clipUrl = "url(#" + clipId + ")";
					this.rawNode.setAttribute("clip-path", clipUrl);
					clipNode = svg._createElementNS(svg.xmlns.svg, "clipPath");
					clipShape = svg._createElementNS(svg.xmlns.svg, clipType);
					clipNode.appendChild(clipShape);
					this.rawNode.parentNode.insertBefore(clipNode, this.rawNode);
					domAttr.set(clipNode, "id", clipId);
				}
				domAttr.set(clipShape, clip);
			}else{
				//remove clip-path
				this.rawNode.removeAttribute("clip-path");
				if(clipNode){
					clipNode.parentNode.removeChild(clipNode);
				}
			}
			return this;
		},
		_removeClipNode: function(){
			var clipNode, clipPathProp = domAttr.get(this.rawNode, "clip-path");
			if(clipPathProp){
				clipNode = dom.byId(clipPathProp.match(/gfx_clip[\d]+/)[0]);
				if(clipNode){
					clipNode.parentNode.removeChild(clipNode);
				}
			}
			return clipNode;
		}
	});
});
