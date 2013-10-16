define([
	"dojo/_base/declare",
	"../shape/Container"
], function(declare, BaseContainer){
	return declare([BaseContainer], {
		openBatch: function(){
			// summary:
			//		starts a new batch, subsequent new child shapes will be held in
			//		the batch instead of appending to the container directly.
			// description:
			//		Because the canvas renderer has no DOM hierarchy, the canvas implementation differs
			//		such that it suspends the repaint requests for this container until the current batch is closed by a call to closeBatch().
			++this._batch;
			return this;
		},
		destroy: function(){
			this._beingDestroyed = true; // prevent _makeDirty in clear()
			this.inherited(arguments);
		},
		closeBatch: function(){
			// summary:
			//		submits the current batch.
			// description:
			//		On canvas, this method flushes the pending redraws queue.
			this._batch = this._batch > 0 ? --this._batch : 0;
			this._makeDirty();
			return this;
		},
		_makeDirty: function(){
			if(!this._batch){
				this.surface.makeDirty();
			}
		},
		add: function(shape){
			shape.surface = this.surface;
			this._makeDirty();
			this.inherited(arguments);
		},
		remove: function(shape, silently){
			this._makeDirty();
			this.inherited(arguments);
		},
		clear: function(){
			if(!this._beingDestroyed){
				this._makeDirty();
			}
			this.inherited(arguments);
		},
		_moveChildToFront: function(shape){
			this._makeDirty();
			this.inherited(arguments);
		},
		_moveChildToBack: function(shape){
			this._makeDirty();
			this.inherited(arguments);
		}
	});
});
