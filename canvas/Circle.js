define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/Circle"
], function(declare, canvasShape, baseCircle){

	var twoPI = Math.PI * 2;

	return declare([canvasShape, baseCircle], {
		// summary:
		//		a circle shape (Canvas)
		_renderShape: function(/* Object */ ctx){
			var s = this.shape;
			ctx.beginPath();
			ctx.arc(s.cx, s.cy, s.r, 0, twoPI, 1);
		},
		_renderDashedStroke: function(ctx, apply){
			var s = this.shape;
			var startAngle = 0, angle, l = this.canvasDash.length;
			i = 0;
			while(startAngle < twoPI){
				angle = this.canvasDash[i % l] / s.r;
				if(!(i % 2)){
					ctx.beginPath();
					ctx.arc(s.cx, s.cy, s.r, startAngle, startAngle + angle, 0);
					if(apply) ctx.stroke();
				}
				startAngle += angle;
				++i;
			}
		}
	});
});
