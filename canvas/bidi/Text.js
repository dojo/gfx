define(["dcl/dcl", "../../_bidi"], function (dcl, bidi) {
	return dcl(null, {
		makeBidiText: function (text, targetDir) {
			return (targetDir === "rtl") ? bidi.RLE + text + bidi.PDF : bidi.LRE + text + bidi.PDF;
		},

		_setShapeAttr: dcl.advise({
			around: function (sup) {
				return function (value) {
					value = bidi.bidiPreprocess.call(this, value);
					sup.call(this, value);
				};
			}
		}),

		_getShapeAttr: dcl.advise({
			around: function (sup) {
				return function () {
					var value = sup ? sup.call(this) : this._get("shape");
					return bidi.restoreText.call(this, value);
				};
			}
		})
	});
});
