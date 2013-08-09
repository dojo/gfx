define([
	"dojo/_base/window",
	"../bezierutils"
], function(win, bezierUtils){

	//noinspection JSUnresolvedVariable
	if(win.global.CanvasRenderingContext2D){
		var ctx2d = win.doc.createElement("canvas").getContext("2d");
		//noinspection JSUnresolvedVariable
		var hasNativeDash = typeof ctx2d.setLineDash == "function";
		var hasFillText = typeof ctx2d.fillText == "function";
	}

	function toDashedLineTo(/*Array||CanvasRenderingContext2D*/ctx, /*shape.Shape*/shape, /*int*/x1, /*int*/y1, /*int*/x2, /*int*/y2, /*Object*/prevResidue){
		// summary:
		//		Builds a set of moveTo/lineTo' canvas instructions that represents a dashed stroke of the specified line geometry.

		var residue = 0, r = 0, dal = 0, tlength = bezierUtils.distance(x1, y1, x2, y2), i = 0, dash = shape.canvasDash,
			prevx = x1, prevy = y1, x, y, ctx2d = !(ctx instanceof Array);
		if(prevResidue){
			dal=prevResidue.l;
			i = prevResidue.i;
		}else{
			dal += dash[0];
		}
		while(Math.abs(1-r)>0.01){
			if(dal>tlength){
				residue = {l:dal-tlength,i:i};
				dal=tlength;
			}
			r = dal/tlength;
			x = x1 + (x2-x1)*r;
			y = y1 + (y2-y1)*r;
			if(!(i++%2)){
				if(ctx2d){
					ctx.moveTo(prevx, prevy);
					ctx.lineTo(x, y);
				}else{
					ctx.push("moveTo", [prevx, prevy]);
					ctx.push("lineTo", [x, y]);
				}
			}
			prevx = x;
			prevy = y;
			dal += dash[i%dash.length];
		}
		return residue;
	}

	var fixTarget = function(){
		// tags:
		//		private
		return true;
	};

	return {
		hasNativeDash: hasNativeDash,
		hasFillText: hasFillText,
		toDashedLineTo:toDashedLineTo,
		fixTarget: fixTarget
	}
});
