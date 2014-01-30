define(["dcl/dcl", "../../_bidi"], function(dcl, bidi){
	var bidi_const = bidi.bidi_const;
	return dcl(null, {
		makeBidiText: function(text, targetDir){
			return bidi_const.LRM + (targetDir == "rtl" ? bidi_const.RLE : bidi_const.LRE) + text + bidi_const.PDF;
		},

		_setShapeAttr: dcl.advise({
			around: function(sup){
				return function(value){
					value = bidi.bidiPreprocess.call(this, value);
					sup.call(this, value);
				};
			}}),

		_getShapeAttr: dcl.advise({
			around: function(sup){
				return function(){
					var value = sup ? sup.call(this) : this._get("shape");
					return bidi.restoreText.call(this, value);
				};
			}})
	})
});
