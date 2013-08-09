define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Polyline"
], function(declare, canvasWithEventsShape, canvasPolyline){
	return declare([canvasWithEventsShape, canvasPolyline], {});
});
