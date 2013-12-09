define([
	"dcl/dcl",
	"../shape/_ContainerBase"
], function(dcl, ContainerBase){
	return dcl([ContainerBase], {
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
		destroy: dcl.superCall(function(sup){
			return function(){
				this._beingDestroyed = true; // prevent _makeDirty in clear()
				sup.apply(this, arguments);
			}
		}),
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
		add: dcl.superCall(function(sup){
			return function(shape){
				shape.surface = this.surface;
				this._makeDirty();
				sup.apply(this, arguments);
			}
		}),
		remove: dcl.superCall(function(sup){
			return function(shape, silently){
				this._makeDirty();
				sup.apply(this, arguments);
			}
		}),
		clear: dcl.superCall(function(sup){
			return function(){
				if(!this._beingDestroyed){
					this._makeDirty();
				}
				sup.apply(this, arguments);
			}
		}),
		_moveChildToFront: dcl.superCall(function(sup){
			return function(shape){
				this._makeDirty();
				sup.apply(this, arguments);
			}
		}),
		_moveChildToBack: dcl.superCall(function(sup){
			return function(shape){
				this._makeDirty();
				sup.apply(this, arguments);
			}
		})
	});
});
