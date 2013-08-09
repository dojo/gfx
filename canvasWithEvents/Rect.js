define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Rect"
], function(declare, canvasWithEventsShape, canvasRect){
	return declare([canvasWithEventsShape, canvasRect], {});
});
