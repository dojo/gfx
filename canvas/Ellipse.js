define([
	"dcl/dcl",
	"./_base",
	"./Shape",
	"../shape/_EllipseBase",
	"../arc",
	"../matrix"
], function(dcl, canvas, CanvasShape, EllipseBase, ga, m){

	var mp = m.multiplyPoint;

	var bezierCircle = [];
	(function(){
		var u = ga.curvePI4;
		bezierCircle.push(u.s, u.c1, u.c2, u.e);
		for(var a = 45; a < 360; a += 45){
			var r = m.rotateg(a);
			bezierCircle.push(mp(r, u.c1), mp(r, u.c2), mp(r, u.e));
		}
	})();

	var makeEllipse = function(shape){
		// prepare Canvas-specific structures
		var t, c1, c2, r = [], s = shape.shape,
			M = m.normalize([m.translate(s.cx, s.cy), m.scale(s.rx, s.ry)]);
		t = mp(M, bezierCircle[0]);
		r.push([t.x, t.y]);
		for(var i = 1; i < bezierCircle.length; i += 3){
			c1 = mp(M, bezierCircle[i]);
			c2 = mp(M, bezierCircle[i + 1]);
			t = mp(M, bezierCircle[i + 2]);
			r.push([c1.x, c1.y, c2.x, c2.y, t.x, t.y]);
		}
		if(shape._needsDash){
			var points = [], p1 = r[0];
			for(i = 1; i < r.length; ++i){
				var curves = [];
				splitToDashedBezier(p1.concat(r[i]), shape.canvasDash, curves);
				p1 = [r[i][4], r[i][5]];
				points.push(curves);
			}
			shape._dashedPoints = points;
		}
		return r;
	};

	var Ellipse = dcl([CanvasShape, EllipseBase], {
		// summary:
		//		an ellipse shape (Canvas)
		_setShapeAttr: dcl.superCall(function(sup){
			return function(){
				sup.apply(this, arguments);
				this.canvasEllipse = makeEllipse(this);
				return this;
			}
		}),
		_setStrokeStyleAttr: dcl.superCall(function(sup){
			return function(){
				sup.apply(this, arguments);
				if(!canvas.hasNativeDash){
					this.canvasEllipse = makeEllipse(this);
				}
				return this;
			}
		}),
		_renderShape: function(/* Object */ ctx){
			var r = this.canvasEllipse, i;
			ctx.beginPath();
			ctx.moveTo.apply(ctx, r[0]);
			for(i = 1; i < r.length; ++i){
				ctx.bezierCurveTo.apply(ctx, r[i]);
			}
			ctx.closePath();
		},
		_renderDashedStroke: function(ctx, apply){
			var r = this._dashedPoints;
			ctx.beginPath();
			for(var i = 0; i < r.length; ++i){
				var curves = r[i];
				for(var j = 0; j < curves.length; ++j){
					var curve = curves[j];
					ctx.moveTo(curve[0], curve[1]);
					ctx.bezierCurveTo(curve[2], curve[3], curve[4], curve[5], curve[6], curve[7]);
				}
			}
			if(apply) ctx.stroke();
		}
	});

	Ellipse.makeEllipse = makeEllipse;

	return Ellipse;
});
