define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Path"
], function(declare, canvasWithEventsShape, canvasPath){
	return declare([canvasWithEventsShape, canvasPath], {});
});
