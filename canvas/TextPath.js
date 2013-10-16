define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/TextPath"
], function(declare, CanvasShape, BaseTextPath){
	return declare([CanvasShape, BaseTextPath], {
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
