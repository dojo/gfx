define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Circle"
], function(declare, CanvasWithEventsShape, CanvasCircle){
	return declare([CanvasWithEventsShape, CanvasCircle], {});
});
