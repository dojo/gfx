define([
	"dcl/dcl",
	"./Shape",
	"../shape/_TextPathBase"
], function(dcl, CanvasShape, TextPathBase){
	return dcl([CanvasShape, TextPathBase], {
		// summary:
		//		a text shape (Canvas) - NOT YET IMPLEMENTED
		_renderShape: function(/* Object */ ctx){
			var s = this.shape;
			// nothing for the moment
		},
		_setText: function(){
			// not implemented
		},
		_setFont: function(){
			// not implemented
		}
	});
});
