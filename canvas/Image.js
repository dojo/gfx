define([
	"dcl/dcl",
	"./Shape",
	"../shape/_ImageBase"
], function(dcl, CanvasShape, ImageBase){
	return dcl([CanvasShape, ImageBase], {
		// summary:
		//		an image shape (Canvas)
		_setShapeAttr: dcl.superCall(function(sup){
			return function(){
				sup.apply(this, arguments);
				// prepare Canvas-specific structures
				var img = new Image();
				if(this.surface){
					this.surface.downloadImage(img, this.shape.src);
				}else{
					this._pendingImage = true;
				}
				this.canvasImage = img;
				return this;
			}
		}),
		_setParent: dcl.superCall(function(sup){
			return function(){
				sup.apply(this, arguments);
				if(this._pendingImage){
					this._pendingImage = false;
					this.surface.downloadImage(this.canvasImage, this.shape.src);
				}
			}
		}),
		_renderShape: function(/* Object */ ctx){
			var s = this.shape;
			ctx.drawImage(this.canvasImage, s.x, s.y, s.width, s.height);
		}
	});
});
