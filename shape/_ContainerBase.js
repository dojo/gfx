define([
	"dcl/dcl", "../matrix", "dojo/has", "dojo/has!dojo-bidi?./bidi/_Container"
], function (dcl, matrixLib, has, BidiContainer) {
	var Container = dcl(null, {
		// summary:
		//		a container of shapes, which can be used
		//		as a foundation for renderer-specific groups, or as a way
		//		to logically group shapes (e.g, to propagate matricies)

		// children: Array
		//		a list of children
		children: null,

		constructor: function () {
			this._init();
		},

		_init: function () {
			this.children = [];
			this._batch = 0;
		},

		// group management

		openBatch: function () {
			// summary:
			//		starts a new batch, subsequent new child shapes will be held in
			//		the batch instead of appending to the container directly.
			// description:
			//		Because the canvas renderer has no DOM hierarchy, the canvas implementation differs
			//		such that it suspends the repaint requests for this container until the current batch is closed
			//		by a call to closeBatch().
			return this;
		},
		closeBatch: function () {
			// summary:
			//		submits the current batch, append all pending child shapes to DOM
			// description:
			//		On canvas, this method flushes the pending redraws queue.
			return this;
		},
		add: function (shape) {
			// summary:
			//		adds a shape to the list
			// shape: gfx/shape.Shape
			//		the shape to add to the list
			var oldParent = shape.getParent();
			if (oldParent) {
				oldParent.remove(shape, true);
			}
			this.children.push(shape);
			return shape._setParent(this, this._getRealMatrix());	// self
		},
		remove: function (shape, silently) {
			// summary:
			//		removes a shape from the list
			// shape: gfx/shape.Shape
			//		the shape to remove
			// silently: Boolean
			//		if true, do not redraw a picture yet
			for (var i = 0; i < this.children.length; ++i) {
				if (this.children[i] === shape) {
					if (silently) {
						// skip for now
					} else {
						shape.parent = null;
						shape.parentMatrix = null;
					}
					this.children.splice(i, 1);
					break;
				}
			}
			return this;	// self
		},
		clear: function (/*Boolean?*/ destroy) {
			// summary:
			//		removes all shapes from a group/surface.
			// destroy: Boolean
			//		Indicates whether the children should be destroyed. Optional.
			var shape;
			for (var i = 0; i < this.children.length; ++i) {
				shape = this.children[i];
				shape.parent = null;
				shape.parentMatrix = null;
				if (destroy) {
					shape.destroy();
				}
			}
			this.children = [];
			return this;	// self
		},
		getBoundingBox: function () {
			// summary:
			//		Returns the bounding box Rectangle for this shape.
			if (this.children) {
				// if this is a composite shape, then sum up all the children
				var result = null;
				this.children.forEach(function (shape) {
					var bb = shape.getBoundingBox();
					if (bb) {
						var ct = shape.transform;
						if (ct) {
							bb = matrixLib.multiplyRectangle(ct, bb);
						}
						if (result) {
							// merge two bbox
							result.x = Math.min(result.x, bb.x);
							result.y = Math.min(result.y, bb.y);
							result.endX = Math.max(result.endX, bb.x + bb.width);
							result.endY = Math.max(result.endY, bb.y + bb.height);
						} else {
							// first bbox
							result = {
								x: bb.x,
								y: bb.y,
								endX: bb.x + bb.width,
								endY: bb.y + bb.height
							};
						}
					}
				});
				if (result) {
					result.width = result.endX - result.x;
					result.height = result.endY - result.y;
				}
				return result; // gfx.Rectangle
			}
			// unknown/empty bounding box, subclass shall override this impl
			return null;
		},
		// moving child nodes
		_moveChildToFront: function (shape) {
			// summary:
			//		moves a shape to front of the list of shapes
			// shape: gfx/shape.Shape
			//		one of the child shapes to move to the front
			for (var i = 0; i < this.children.length; ++i) {
				if (this.children[i] === shape) {
					this.children.splice(i, 1);
					this.children.push(shape);
					break;
				}
			}
			return this;	// self
		},
		_moveChildToBack: function (shape) {
			// summary:
			//		moves a shape to back of the list of shapes
			// shape: gfx/shape.Shape
			//		one of the child shapes to move to the front
			for (var i = 0; i < this.children.length; ++i) {
				if (this.children[i] === shape) {
					this.children.splice(i, 1);
					this.children.unshift(shape);
					break;
				}
			}
			return this;	// self
		}
	});
	return has("dojo-bidi") ? dcl([Container, BidiContainer], {}) : Container;
});
