define([
	"dcl/dcl",
	"./_base",
	"./Shape",
	"../shape/_RectBase"
], function(dcl, canvas, CanvasShape, RectBase){

	function drawDashedArc(/*CanvasRenderingContext2D*/ctx, /*Number[]*/dash,  /*int*/cx,  /*int*/cy,  /*int*/r, /*Number*/sa, /*Number*/ea, /*Boolean*/ccw, /*Boolean?*/apply, prevResidue){
		var residue, angle, l = dash.length, i= 0;
		// if there's a previous dash residue from the previous arc, start with it.
		if(prevResidue){
			angle = prevResidue.l/r;
			i = prevResidue.i;
		}else{
			angle = dash[0]/r;
		}
		while(sa < ea){
			// if the dash segment length is longer than what remains to stroke, keep it for next arc. (aka residue)
			if(sa+angle > ea){
				residue = {l: (sa+angle-ea)*r, i: i};
				angle = ea-sa;
			}
			if(!(i%2)){
				ctx.beginPath();
				ctx.arc(cx, cy, r, sa, sa+angle, ccw);
				if(apply) ctx.stroke();
			}
			sa += angle;
			++i;
			angle = dash[i%l]/r;
		}
		return residue;
	}

	var pi = Math.PI, halfPI = pi / 2;

	return dcl([CanvasShape, RectBase], {
		// summary:
		//		a rectangle shape (Canvas)
		_renderShape: function(/* Object */ ctx){
			var s = this.shape, r = Math.min(s.r, s.height / 2, s.width / 2),
				xl = s.x, xr = xl + s.width, yt = s.y, yb = yt + s.height,
				xl2 = xl + r, xr2 = xr - r, yt2 = yt + r, yb2 = yb - r;
			ctx.beginPath();
			ctx.moveTo(xl2, yt);
			if(r){
				ctx.arc(xr2, yt2, r, -halfPI, 0, false);
				ctx.arc(xr2, yb2, r, 0, halfPI, false);
				ctx.arc(xl2, yb2, r, halfPI, pi, false);
				ctx.arc(xl2, yt2, r, pi, pi + halfPI, false);
			}else{
				ctx.lineTo(xr2, yt);
				ctx.lineTo(xr, yb2);
				ctx.lineTo(xl2, yb);
				ctx.lineTo(xl, yt2);
			}
			ctx.closePath();
		},
		_renderDashedStroke: function(ctx, apply){
			var s = this.shape, residue, r = Math.min(s.r, s.height / 2, s.width / 2),
				xl = s.x, xr = xl + s.width, yt = s.y, yb = yt + s.height,
				xl2 = xl + r, xr2 = xr - r, yt2 = yt + r, yb2 = yb - r;
			if(r){
				ctx.beginPath();
				residue = canvas.toDashedLineTo(ctx, this, xl2, yt, xr2, yt);
				if(apply) ctx.stroke();
				residue = drawDashedArc(ctx, this.canvasDash, xr2, yt2, r, -halfPI, 0, false, apply, residue);
				ctx.beginPath();
				residue = canvas.toDashedLineTo(ctx, this, xr, yt2, xr, yb2, residue);
				if(apply) ctx.stroke();
				residue = drawDashedArc(ctx, this.canvasDash, xr2, yb2, r, 0, halfPI, false, apply, residue);
				ctx.beginPath();
				residue = canvas.toDashedLineTo(ctx, this, xr2, yb, xl2, yb, residue);
				if(apply) ctx.stroke();
				residue = drawDashedArc(ctx, this.canvasDash, xl2, yb2, r, halfPI, pi, false, apply, residue);
				ctx.beginPath();
				residue = canvas.toDashedLineTo(ctx, this, xl, yb2, xl, yt2, residue);
				if(apply) ctx.stroke();
				drawDashedArc(ctx, this.canvasDash, xl2, yt2, r, pi, pi + halfPI, false, apply, residue);
			}else{
				ctx.beginPath();
				residue = canvas.toDashedLineTo(ctx, this, xl2, yt, xr2, yt);
				residue = canvas.toDashedLineTo(ctx, this, xr2, yt, xr, yb2, residue);
				residue = canvas.toDashedLineTo(ctx, this, xr, yb2, xl2, yb, residue);
				canvas.toDashedLineTo(ctx, this, xl2, yb, xl, yt2, residue);
				if(apply) ctx.stroke();
			}
		}
	});
});
