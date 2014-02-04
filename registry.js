define(["dojo/has", "./shape"], function (has, shapeLib) {

	has.add("gfxRegistry", 1);

	var registry = {};

	// a set of ids (keys=type)
	var _ids = {};
	// a simple set impl to map shape<->id
	var hash = {};

	registry.register = shapeLib.register = function (/*gfx/shape.Shape*/s) {
		// summary:
		//		Register the specified shape into the graphics registry.
		// s: gfx/shape.Shape
		//		The shape to register.
		// returns: Number
		//		The unique id associated with this shape.

		// the id pattern : type+number (ex: Rect0,Rect1,etc)
		// declaredClass is now optional with dcl
		var t = s.declaredClass ? s.declaredClass.split(".").pop() : "Shape";
		var i = t in _ids ? ++_ids[t] : ((_ids[t] = 0));
		var uid = t + i;
		hash[uid] = s;
		return uid;
	};

	registry.byId = shapeLib.byId = function (/*String*/id) {
		// summary:
		//		Returns the shape that matches the specified id.
		// id: String
		//		The unique identifier for this Shape.
		// returns: gfx/shape.Shape
		return hash[id]; //gfx/shape.Shape
	};

	registry.dispose = shapeLib.dispose = function (/*gfx/shape.Shape*/s, /*Boolean?*/recurse) {
		// summary:
		//		Removes the specified shape from the registry.
		// s: gfx/shape.Shape
		//		The shape to unregister.
		if (recurse && s.children) {
			for (var i = 0; i < s.children.length; ++i) {
				registry.dispose(s.children[i], true);
			}
		}
		var uid = s.getUID();
		hash[uid] = null;
		delete hash[uid];
	};

	return registry;
});
