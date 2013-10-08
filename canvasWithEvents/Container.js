define([
	"dojo/_base/declare",
	"../canvas/Container"
], function(declare, canvasContainer){
	return declare([canvasContainer], {
		add: function(shape){
			this.inherited(arguments);
			shape.rawNode.ownerDocument = this.surface.rawNode.ownerDocument;
			shape.rawNode.parentNode = this.rawNode;
		}
	});
});
