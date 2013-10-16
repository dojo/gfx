define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Text"
], function(declare, CanvasWithEventsShape, CanvasText){
	return declare([CanvasWithEventsShape, CanvasText], {
		_testInputs: function(ctx, pos){
			return this._hitTestPixel(ctx, pos);
		}
	});
});
