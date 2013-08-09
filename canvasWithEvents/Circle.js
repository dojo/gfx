define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Circle"
], function(declare, canvasWithEventsShape, canvasCircle){
	return declare([canvasWithEventsShape, canvasCircle], {});
});
