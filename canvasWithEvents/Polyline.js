define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Polyline"
], function(declare, CanvasWithEventsShape, CanvasPolyline){
	return declare([CanvasWithEventsShape, CanvasPolyline], {});
});
