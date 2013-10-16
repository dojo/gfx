define([
	"dojo/_base/declare",
	"../_base",
	"./_base",
	"./Shape",
	"../shape/_TextBase"
], function(declare, g, canvas, CanvasShape, TextBase){

	var hasFillText = canvas.hasFillText;

	return declare([CanvasShape, TextBase], {
		_setFont: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			if(this.fontStyle){
				this.canvasFont = g.makeFontString(this.fontStyle);
			}else{
				delete this.canvasFont;
			}
		},

		getTextWidth: function(){
			// summary:
			//		get the text width in pixels
			if(!hasFillText){
				return 0;
			}
			var s = this.shape, w = 0, ctx;
			if(s.text){
				ctx = this.surface.rawNode.getContext("2d");
				ctx.save();
				this._renderTransform(ctx);
				this._renderFill(ctx, false);
				this._renderStroke(ctx, false);
				if(this.canvasFont)
					ctx.font = this.canvasFont;
				w = ctx.measureText(s.text).width;
				ctx.restore();
			}
			return w;
		},

		getBoundingBox: function(){
			if(!hasFillText){
				return null;
			}
			return this.inherited(arguments);
		},

		// override to apply first fill and stroke (
		// the base implementation is for path-based shape that needs to first define the path then to fill/stroke it.
		// Here, we need the fillstyle or strokestyle to be set before calling fillText/strokeText.
		_render: function(/* Object */ctx){
			// summary:
			//		render the shape
			// ctx: Object
			//		the drawing context.
			ctx.save();
			this._renderTransform(ctx);
			this._renderFill(ctx, false);
			this._renderStroke(ctx, false);
			this._renderShape(ctx);
			ctx.restore();
		},

		_renderShape: function(ctx){
			// summary:
			//		a text shape (Canvas)
			// ctx: Object
			//		the drawing context.
			if(!hasFillText){
				return;
			}
			var ta, s = this.shape;
			if(!s.text){
				return;
			}
			// text align
			ta = s.align === 'middle' ? 'center' : s.align;
			ctx.textAlign = ta;
			if(this.canvasFont){
				ctx.font = this.canvasFont;
			}
			if(this.canvasFill){
				ctx.fillText(s.text, s.x, s.y);
			}
			if(this.strokeStyle){
				ctx.beginPath(); // fix bug in FF3.6. Fixed in FF4b8
				ctx.strokeText(s.text, s.x, s.y);
				ctx.closePath();
			}
		}
	});
});
