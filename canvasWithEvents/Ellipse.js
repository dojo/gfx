define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Ellipse"
], function(declare, CanvasWithEventsShape, CanvasEllipse){
	return declare([CanvasWithEventsShape, CanvasEllipse], {});
});
