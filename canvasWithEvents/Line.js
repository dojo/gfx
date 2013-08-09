define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Line"
], function(declare, canvasWithEventsShape, canvasLine){
	return declare([canvasWithEventsShape, canvasLine], {});
});
