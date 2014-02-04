define([
	"dcl/dcl", "./_base", "./Shape", "../shape/_PolylineBase"
], function (dcl, canvas, CanvasShape, PolylineBase) {
	return dcl([CanvasShape, PolylineBase], {
		// summary:
		//		a polyline/polygon shape (Canvas)
		_setShapeAttr: dcl.superCall(function (sup) {
			return function () {
				sup.apply(this, arguments);
				var p = this.shape.points, f = p[0], r, c, i;
				this.bbox = null;
				// normalize this.shape.points as array of points: [{x,y}, {x,y}, ...]
				this._normalizePoints();
				// after _normalizePoints, if shape.points was [x1,y1,x2,y2,..], shape.points references a new array
				// and p references the original points array
				// prepare Canvas-specific structures, if needed
				if (p.length) {
					if (typeof f === "number") { // already in the canvas format [x1,y1,x2,y2,...]
						r = p;
					} else { // convert into canvas-specific format
						r = [];
						for (i = 0; i < p.length; ++i) {
							c = p[i];
							r.push(c.x, c.y);
						}
					}
				} else {
					r = [];
				}
				this.canvasPolyline = r;
				return this;
			};
		}),
		_renderShape: function (/* Object */ ctx) {
			var p = this.canvasPolyline;
			if (p.length) {
				ctx.beginPath();
				ctx.moveTo(p[0], p[1]);
				for (var i = 2; i < p.length; i += 2) {
					ctx.lineTo(p[i], p[i + 1]);
				}
			}
		},
		_renderDashedStroke: function (ctx, apply) {
			var p = this.canvasPolyline, residue = 0;
			ctx.beginPath();
			for (var i = 0; i < p.length; i += 2) {
				residue = canvas.toDashedLineTo(ctx, this, p[i], p[i + 1], p[i + 2], p[i + 3], residue);
			}
			if (apply) {
				ctx.stroke();
			}
		}
	});
});
