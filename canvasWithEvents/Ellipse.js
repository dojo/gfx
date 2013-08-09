define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Ellipse"
], function(declare, canvasWithEventsShape, canvasEllipse){
	return declare([canvasWithEventsShape, canvasEllipse], {});
});
