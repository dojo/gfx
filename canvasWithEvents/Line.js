define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Line"
], function(declare, CanvasWithEventsShape, CanvasLine){
	return declare([CanvasWithEventsShape, CanvasLine], {});
});
