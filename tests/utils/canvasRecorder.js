define(["dcl/dcl", "gfx/canvas/Surface"], function (dcl, CanvasSurface) {
	// summary:
	//		A filtering Canvas context that records all context calls.
	//		Used in unit tests to compare Canvas output.

	var funcs = [
		"save", "restore", "moveTo", "lineTo", "push", "beginPath", "arc", "stroke", "bezierCurveTo",
		"quadraticCurveTo", "closePath", "drawImage", "createLinearGradient", "createRadialGradient", "addColorStop",
		"translate", "scale", "rotate", "clip", "fill", "clearRect", "measureText", "fillText", "strokeText",
		"setLineDash", "createPattern"
	];

	var props = ["fillStyle", "strokeStyle", "lineWidth", "lineCap", "lineJoin", "miterLimit", "font", "textAlign"];

	var abb = {}, used = {};

	function abbrev(n) {
		for (var i = 1; i < n.length; i++) {
			var a = n.substring(0, i);
			if (!used[a]) {
				used[a] = n;
				abb[n] = a;
				break;
			}
		}
	}

	var recorder = {
		_ctx: null,
		constructor: function (canvas, ctx) {
			this._canvas = canvas;
			this._ctx = ctx;
		}
	};

	function normalize(a) {
		if (typeof a === "number" && a !== Math.round(a)) {
			a = parseFloat(a.toFixed(4));
		}
		if (typeof a === "string") {
			a = a.replace(/rgba\((\d*),\s*(\d*),\s*(\d*),\s*([\d.]*)\)/, "$1,$2,$3,$4");
		}
		if (typeof a.getAttribute === "function" && a.tagName === "IMG") {
			return a.getAttribute("src");
		}
		return a;
	}

	funcs.forEach(function (f) {
		abbrev(f);
		recorder[f] = function () {
			var r = this._ctx[f].apply(this._ctx, arguments), i;
			if (f === "clearRect" && arguments[0] === 0 && arguments[1] === 0 && arguments[2] === this._canvas.width &&
				arguments[3] === this._canvas.height) {
				this._canvas._calls = [];
			} else if (f === "createLinearGradient" || f === "createRadialGradient") {
				var g = {
					realGradient: r,
					args: [f === "createLinearGradient" ? "l" : "r"],
					addColorStop: function () {
						r.addColorStop.apply(r, arguments);
						for (i = 0; i < arguments.length; i++) {
							g.args.push(normalize(arguments[i]));
						}
					}
				};
				for (i = 0; i < arguments.length; i++) {
					g.args.push(normalize(arguments[i]));
				}
				return g;
			} else {
				this._canvas._calls.push(abb[f]);
				for (i = 0; i < arguments.length; i++) {
					var a = arguments[i];
					if (f === "createPattern" && i === 0) {
						a = a._calls;
					} else {
						a = normalize(a);
					}
					this._canvas._calls.push(a);
				}
			}
			return r;
		};
	});

	var CanvasRecorder = dcl(null, recorder);

	var proto = CanvasRecorder.prototype;
	props.forEach(function (p) {
		abbrev(p);
		Object.defineProperty(proto, p, {
			get: function () {
				return this._ctx[p];
			},
			set: function (v) {
				var a;
				if (v.realGradient) {
					a = v.args;
					v = v.realGradient;
				} else {
					a = normalize(v);
				}
				this._ctx[p] = v;
				this._canvas._calls.push(abb[p], a);
			}
		});
	});

	var getContext = CanvasSurface.prototype._getContext;
	CanvasSurface.prototype._getContext = function (canvas) {
		if (canvas._calls === undefined) {
			canvas._calls = [];
		}
		var ctx = getContext.call(this, canvas);
		return new CanvasRecorder(canvas, ctx);
	};

	return {
		getRecording: function (surface) {
			surface._render();
			return JSON.stringify(surface.rawNode._calls);
		},
		abbreviations: abb
	};
});
