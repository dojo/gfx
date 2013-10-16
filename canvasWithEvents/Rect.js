define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Rect"
], function(declare, CanvasWithEventsShape, CanvasRect){
	return declare([CanvasWithEventsShape, CanvasRect], {});
});
