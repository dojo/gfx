define([
	"dcl/dcl", "dojo/_base/lang", "dojo/_base/window", "dojo/on"
], function (dcl, lang, win, on) {
	var fixCallback = function (gfxElement, fixFunction, scope, method) {
		// summary:
		//		Wraps the callback to allow for tests and event normalization
		//		before it gets invoked. This is where '_fixTarget' is invoked.
		// tags:
		//      private
		// gfxElement: Object
		//		The GFX object that triggers the action (ex.:
		//		gfx.Surface and gfx/shape.Shape). A new event property
		//		'gfxTarget' is added to the event to reference this object.
		//		for easy manipulation of GFX objects by the event handlers.
		// fixFunction: Function
		//		The function that implements the logic to set the 'gfxTarget'
		//		property to the event. It should be 'this._fixTarget' for
		//		most of the cases
		// scope: Object
		//		Optional. The scope to be used when invoking 'method'. If
		//		omitted, a global scope is used.
		// method: Function|String
		//		The original callback to be invoked.
		if (!method) {
			method = scope;
			scope = null;
		}
		if (typeof method === "string") {
			scope = scope || win.global;
			if (!scope[method]) {
				throw (["gfx.shape.fixCallback: scope[\"", method, "\"] is null (scope=\"", scope, "\")"].join(""));
			}
			return function (e) {
				return fixFunction(e, gfxElement) ? scope[method].apply(scope, arguments || []) : undefined;
			}; // Function
		}
		return !scope ? function (e) {
			return (!fixFunction || fixFunction(e, gfxElement)) ? method.apply(scope, arguments) : undefined;
		} : function (e) {
			return (!fixFunction || fixFunction(e, gfxElement)) ? method.apply(scope, arguments || []) : undefined;
		}; // Function
	};
	return dcl(null, {
		on: function (type, listener) {
			//	summary:
			//		Connects an event to this shape.

			return on(this.getEventSource(), type, fixCallback(this, this._fixTarget, listener));
		},

		connect: function (name, object, method) {
			// summary:
			//		connects a handler to an event on this shape

			// COULD BE RE-IMPLEMENTED BY THE RENDERER!
			// redirect to fixCallback to normalize events and add the gfxTarget to the event. The latter
			// is done by this._fixTarget which is defined by each renderer
			if (name.substring(0, 2) === "on") {
				name = name.substring(2);
			}
			return this.on(name, method ? lang.hitch(object, method) : object);
		},

		disconnect: function (token) {
			// summary:
			//		connects a handler by token from an event on this shape

			// COULD BE RE-IMPLEMENTED BY THE RENDERER!

			return token.remove();
		}
	});
});
