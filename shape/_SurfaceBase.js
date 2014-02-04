define([
	"dojo/_base/lang", "dcl/dcl", "dojo/_base/sniff", "dojo/on", "dojo/dom-construct", "./_EventsProcessing",
	"./_ContainerBase", "./_CreatorBase", "dui/Stateful"
], function (lang, dcl, has, on, domConstruct, EventsProcessing, Container, Creator, Stateful) {
	return dcl([Stateful, EventsProcessing, Container, Creator], {
		// summary:
		//		a surface object to be used for drawings

		processConstructorParameters: function () {
			// summary:
			//		Does nothing to prevent Stateful from mixing in the properties of the 1st constructor argument.
		},

		constructor: function () {
			// underlying node
			this.rawNode = null;
			// the parent node
			this._parent = null;
			// the list of DOM nodes to be deleted in the case of destruction
			this._nodes = [];
			// the list of events to be detached in the case of destruction
			this._events = [];
		},
		destroy: function () {
			// summary:
			//		destroy all relevant external resources and release all
			//		external references to make this object garbage-collectible
			this._nodes.forEach(domConstruct.destroy);
			this._nodes = [];
			this._events.forEach(function (h) {
				if (h) {
					h.remove();
				}
			});
			this._events = [];
			this.rawNode = null;	// recycle it in _nodes, if it needs to be recycled
			if (has("ie")) {
				while (this._parent.lastChild) {
					domConstruct.destroy(this._parent.lastChild);
				}
			} else {
				this._parent.innerHTML = "";
			}
			this._parent = null;
		},
		getEventSource: function () {
			// summary:
			//		returns a node, which can be used to attach event listeners
			return this.rawNode; // Node
		},
		_getRealMatrix: function () {
			// summary:
			//		always returns the identity matrix
			return null;	// gfx/Matrix2D
		},
		/*=====
		 setDimensions: function(width, height){
		 // summary:
		 //		sets the width and height of the rawNode
		 // width: String
		 //		width of surface, e.g., "100px"
		 // height: String
		 //		height of surface, e.g., "100px"
		 return this;	// self
		 },
		 getDimensions: function(){
		 // summary:
		 //     gets current width and height in pixels
		 // returns: Object
		 //     object with properties "width" and "height"
		 },
		 =====*/
		isLoaded: true,
		// TODO: required only for Silverlight, so see if this is still useful in 2.0
		onLoad: function (/*gfx/shape.Surface*/ /*===== surface =====*/) {
			// summary:
			//		local event, fired once when the surface is created
			//		asynchronously, used only when isLoaded is false.
		},
		whenLoaded: function (/*Object|Null*/ context, /*Function|String*/ method) {
			var f = lang.hitch(context, method);
			if (this.isLoaded) {
				f(this);
			} else {
				on.once(this, "load", function (surface) {
					f(surface);
				});
			}
		}
	});
});
