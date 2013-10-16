define([
	"dojo/_base/declare",
	"../canvas/Container"
], function(declare, CanvasContainer){
	return declare([CanvasContainer], {
		add: function(shape){
			this.inherited(arguments);
			shape.rawNode.ownerDocument = this.surface.rawNode.ownerDocument;
			shape.rawNode.parentNode = this.rawNode;
		}
	});
});
