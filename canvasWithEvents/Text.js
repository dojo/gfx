define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Text"
], function(declare, canvasWithEventsShape, canvasText){
	return declare([canvasWithEventsShape, canvasText], {
		_testInputs: function(ctx, pos){
			return this._hitTestPixel(ctx, pos);
		}
	});
});
