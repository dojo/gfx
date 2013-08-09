define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/TextPath"
], function(declare, canvasWithEventsShape, canvasTextPath){
	return declare([canvasWithEventsShape, canvasTextPath], {});
});
