define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/TextPath"
], function(declare, CanvasWithEventsShape, CanvasTextPath){
	return declare([CanvasWithEventsShape, CanvasTextPath], {});
});
