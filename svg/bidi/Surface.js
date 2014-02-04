define(["dcl/dcl", "dojo/dom-style", "../../_bidi"], function (dcl, domStyle, bidi) {
	return dcl(null, {
		constructor: function (parentNode, width, height, textDir) {
			var tDir = bidi.validateTextDir(textDir);

			// if textDir was defined use it, else get default value.
			this.textDir = tDir ? tDir : domStyle.get(this.rawNode, "direction");
		}
	});
});
