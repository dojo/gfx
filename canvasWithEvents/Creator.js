define([
	"dojo/_base/declare",
	"dojo/aspect",
	"../shape/Creator"
], function(declare, aspect, baseCreator){
	return declare([baseCreator], {
		createObject: function(){
			// summary:
			//		Creates a synthetic, partially-interoperable Element object used to uniquely identify the given
			//		shape within the canvas pseudo-DOM.

			var shape = this.inherited(arguments),
				listeners = {};

			shape.rawNode = {
				shape: shape,
				ownerDocument: shape.surface.rawNode.ownerDocument,
				parentNode: shape.parent ? shape.parent.rawNode : null,
				addEventListener: function(type, listener){
					var listenersOfType = listeners[type] = (listeners[type] || []);
					for(var i = 0, record; (record = listenersOfType[i]); ++i){
						if(record.listener === listener){
							return;
						}
					}

					listenersOfType.push({
						listener: listener,
						handle: aspect.after(this, "on" + type, shape.surface.fixTarget(listener), true)
					});
				},
				removeEventListener: function(type, listener){
					var listenersOfType = listeners[type];
					if(!listenersOfType){
						return;
					}
					for(var i = 0, record; (record = listenersOfType[i]); ++i){
						if(record.listener === listener){
							record.handle.remove();
							listenersOfType.splice(i, 1);
							return;
						}
					}
				}
			};
			return shape;
		}
	});
});
