define([
	"dojo/_base/lang", "dcl/dcl", "dojo/_base/sniff", "dojo/on", "./_EventsProcessing", "./_ContainerBase",
	"./_CreatorBase", "delite/Stateful"
], function (lang, dcl, has, on, EventsProcessing, Container, Creator, Stateful) {

	function _empty(/*DomNode*/ node) {
		if (node.canHaveChildren) {
			try {
				// fast path
				node.innerHTML = "";
				return;
			} catch (e) {
				// innerHTML is readOnly (e.g. TABLE (sub)elements in quirks mode)
				// Fall through (saves bytes)
			}
		}
		// SVG/strict elements don't support innerHTML/canHaveChildren, and OBJECT/APPLET elements in quirks node
		// have canHaveChildren=false
		for (var c; c = node.lastChild;) { // intentional assignment
			_destroy(c, node); // destroy is better than removeChild so TABLE subelements are removed in proper order
		}
	}

	function _destroy(/*DomNode*/ node, /*DomNode*/ parent) {
		// in IE quirks, node.canHaveChildren can be false but firstChild can be non-null (OBJECT/APPLET)
		if (node.firstChild) {
			_empty(node);
		}
		if (parent) {
			// removeNode(false) doesn't leak in IE 6+, but removeChild() and removeNode(true) are known to leak
			// under IE 8- while 9+ is TBD.
			// In IE quirks mode, PARAM nodes as children of OBJECT/APPLET nodes have a removeNode method that does
			// nothing and
			// the parent node has canHaveChildren=false even though removeChild correctly removes the PARAM children.
			// In IE, SVG/strict nodes don't have a removeNode method nor a canHaveChildren boolean.
			parent.removeChild(node);
		}
	}

	function destroy(node) {
		_destroy(node, node.parentNode);
	}

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
			this._nodes.forEach(destroy);
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
					destroy(this._parent.lastChild);
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
