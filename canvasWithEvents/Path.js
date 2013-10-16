define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Path"
], function(declare, CanvasWithEventsShape, CanvasPath){
	return declare([CanvasWithEventsShape, CanvasPath], {});
});
