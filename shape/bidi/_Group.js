define(["dcl/dcl"], function (dcl) {
	return dcl(null, {
		constructor: function (textDir) {
			if (textDir) {
				this.textDir = textDir;
			}
		},

		_setParent: dcl.superCall(function (sup) {
			return function (parent) {
				sup.apply(this, arguments);
				if (!this._get("textDir")) {
					this.textDir = parent.textDir;
				}
			};
		})
	});
});
