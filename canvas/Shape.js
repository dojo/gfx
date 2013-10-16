define([
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/_base/declare",
	"../_base",
	"./_base",
	"../shape/Shape",
	"../decompose"
], function(lang, arr, declare, g, canvas, BaseShape){
	var pattrnbuffer = null;

	var hasNativeDash = canvas.hasNativeDash;

	var dasharray = {
		solid:				"none",
		shortdash:			[4, 1],
		shortdot:			[1, 1],
		shortdashdot:		[4, 1, 1, 1],
		shortdashdotdot:	[4, 1, 1, 1, 1, 1],
		dot:				[1, 3],
		dash:				[4, 3],
		longdash:			[8, 3],
		dashdot:			[4, 3, 1, 3],
		longdashdot:		[8, 3, 1, 3],
		longdashdotdot:		[8, 3, 1, 3, 1, 3]
	};

	var Rect, Ellipse, Polyline, Path;

	var makeClip = function(clipType, geometry){
		switch(clipType){
			case "ellipse":
				Ellipse = Ellipse||require("./Ellipse");
				return {
					canvasEllipse: Ellipse.makeEllipse({shape: geometry}),
					render: function(ctx){
						return Ellipse.prototype._renderShape.call(this, ctx);
					}
				};
			case "rect":
				Rect = Rect||require("./Rect");
				return {
					shape: lang.delegate(geometry, {r: 0}),
					render: function(ctx){
						return Rect.prototype._renderShape.call(this, ctx);
					}
				};
			case "path":
				Path = Path||require("./Path");
				return {
					canvasPath: makeClipPath(geometry),
					render: function(ctx){
						this.canvasPath._renderShape(ctx);
					}
				};
			case "polyline":
				Polyline = Polyline||require("./Polyline");
				return {
					canvasPolyline: geometry.points,
					render: function(ctx){
						return Polyline.prototype._renderShape.call(this, ctx);
					}
				};
		}
		return null;
	};

	var makeClipPath = function(geo){
		var p = new Path();
		p.canvasPath = [];
		p._setPath(geo.d);
		return p;
	};

	return declare([BaseShape], {

		setShape: function(shape){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},

		setTransform: function(matrix){
			if(this.parent){
				this.parent._makeDirty();
			}
			this.inherited(arguments);
			// prepare Canvas-specific structures
			if(this.matrix){
				this.canvasTransform = g.decompose(this.matrix);
			}else{
				delete this.canvasTransform;
			}
			return this;
		},

		setFill: function(fill){
			if(this.parent){
				this.parent._makeDirty();
			}
			this.inherited(arguments);
			// prepare Canvas-specific structures
			var fs = this.fillStyle, f;
			if(fs){
				if(typeof(fs) == "object" && "type" in fs){
					var ctx = this.surface.rawNode.getContext("2d");
					//noinspection FallthroughInSwitchStatementJS
					switch(fs.type){
						case "linear":
						case "radial":
							f = fs.type == "linear" ?
								ctx.createLinearGradient(fs.x1, fs.y1, fs.x2, fs.y2) :
								ctx.createRadialGradient(fs.cx, fs.cy, 0, fs.cx, fs.cy, fs.r);
							arr.forEach(fs.colors, function(step){
								f.addColorStop(step.offset, g.normalizeColor(step.color).toString());
							});
							break;
						case "pattern":
							if(!pattrnbuffer){
								pattrnbuffer = document.createElement("canvas");
							}
							// no need to scale the image since the canvas.createPattern uses
							// the original image data and not the scaled ones (see spec.)
							// the scaling needs to be done at rendering time in a context buffer
							var img = new Image();
							this.surface.downloadImage(img, fs.src);
							this.canvasFillImage = img;
					}
				}else{
					// Set fill color using CSS RGBA func style
					f = fs.toString();
				}
				this.canvasFill = f;
			}else{
				delete this.canvasFill;
			}
			return this;
		},

		setStroke: function(stroke){
			if(this.parent){
				this.parent._makeDirty();
			}
			this.inherited(arguments);
			var st = this.strokeStyle;
			if(st){
				var da = this.strokeStyle.style.toLowerCase();
				if(da in dasharray){
					da = dasharray[da];
				}
				if(da instanceof Array){
					da = da.slice();
					this.canvasDash = da;
					var i;
					for(i = 0; i < da.length; ++i){
						da[i] *= st.width;
					}
					if(st.cap != "butt"){
						for(i = 0; i < da.length; i += 2){
							da[i] -= st.width;
							if(da[i] < 1){
								da[i] = 1;
							}
						}
						for(i = 1; i < da.length; i += 2){
							da[i] += st.width;
						}
					}
				}else{
					delete this.canvasDash;
				}
			}else{
				delete this.canvasDash;
			}
			this._needsDash = !hasNativeDash && !!this.canvasDash;
			return this;
		},

		_render: function(/* Object */ ctx){
			// summary:
			//		render the shape
			ctx.save();
			this._renderTransform(ctx);
			this._renderClip(ctx);
			this._renderShape(ctx);
			this._renderFill(ctx, true);
			this._renderStroke(ctx, true);
			ctx.restore();
		},
		_renderClip: function(ctx){
			if(this.canvasClip){
				this.canvasClip.render(ctx);
				ctx.clip();
			}
		},
		_renderTransform: function(/* Object */ ctx){
			if("canvasTransform" in this){
				var t = this.canvasTransform;
				ctx.translate(t.dx, t.dy);
				ctx.rotate(t.angle2);
				ctx.scale(t.sx, t.sy);
				ctx.rotate(t.angle1);
				// The future implementation when vendors catch up with the spec:
				// var t = this.matrix;
				// ctx.transform(t.xx, t.yx, t.xy, t.yy, t.dx, t.dy);
			}
		},
		_renderShape: function(/* Object */ ctx){
			// nothing
		},
		_renderFill: function(/* Object */ ctx, /* Boolean */ apply){
			if("canvasFill" in this){
				var fs = this.fillStyle;
				if("canvasFillImage" in this){
					var w = fs.width, h = fs.height,
						iw = this.canvasFillImage.width, ih = this.canvasFillImage.height,
					// let's match the svg default behavior wrt. aspect ratio: xMidYMid meet
						sx = w == iw ? 1 : w / iw,
						sy = h == ih ? 1 : h / ih,
						s = Math.min(sx, sy), //meet->math.min , slice->math.max
						dx = (w - s * iw) / 2,
						dy = (h - s * ih) / 2;
					// the buffer used to scaled the image
					pattrnbuffer.width = w;
					pattrnbuffer.height = h;
					var copyctx = pattrnbuffer.getContext("2d");
					copyctx.clearRect(0, 0, w, h);
					copyctx.drawImage(this.canvasFillImage, 0, 0, iw, ih, dx, dy, s * iw, s * ih);
					this.canvasFill = ctx.createPattern(pattrnbuffer, "repeat");
					delete this.canvasFillImage;
				}
				ctx.fillStyle = this.canvasFill;
				if(apply){
					// offset the pattern
					if(fs.type === "pattern" && (fs.x !== 0 || fs.y !== 0)){
						ctx.translate(fs.x, fs.y);
					}
					ctx.fill();
				}
			}else{
				ctx.fillStyle = "rgba(0,0,0,0.0)";
			}
		},
		_renderStroke: function(/* Object */ ctx, /* Boolean */ apply){
			var s = this.strokeStyle;
			if(s){
				ctx.strokeStyle = s.color.toString();
				ctx.lineWidth = s.width;
				ctx.lineCap = s.cap;
				if(typeof s.join == "number"){
					ctx.lineJoin = "miter";
					ctx.miterLimit = s.join;
				}else{
					ctx.lineJoin = s.join;
				}
				if(this.canvasDash){
					if(hasNativeDash){
						ctx.setLineDash(this.canvasDash);
						if(apply){
							ctx.stroke();
						}
					}else{
						this._renderDashedStroke(ctx, apply);
					}
				}else{
					if(apply){
						ctx.stroke();
					}
				}
			}else if(!apply){
				ctx.strokeStyle = "rgba(0,0,0,0.0)";
			}
		},
		_renderDashedStroke: function(ctx, apply){
		},

		// events are not implemented
		getEventSource: function(){
			return null;
		},
		on: function(){
		},
		connect: function(){
		},
		disconnect: function(){
		},

		canvasClip: null,
		setClip: function(/*Object*/clip){
			this.inherited(arguments);
			var clipType = clip ? "width" in clip ? "rect" :
				"cx" in clip ? "ellipse" :
					"points" in clip ? "polyline" : "d" in clip ? "path" : null : null;
			if(clip && !clipType){
				return this;
			}
			this.canvasClip = clip ? makeClip(clipType, clip) : null;
			if(this.parent){
				this.parent._makeDirty();
			}
			return this;
		}
	});
});
