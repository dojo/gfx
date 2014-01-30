define(["dcl/dcl", "dojo/has", "../../_bidi"], function(dcl, has, bidi){
	var bidi_const = bidi.bidi_const;
	var bidiEngine = bidi.bidiEngine;
	return dcl(null, {
		makeBidiText: function(text, targetDir){
			if(has("ff")){
				return bidi_const.LRM + (targetDir == "rtl" ? bidi_const.RLE : bidi_const.LRE) + text + bidi_const.PDF;
			}else{
				return (targetDir == "rtl") ? bidiEngine.bidiTransform(text, "IRYNN", "VLNNN") : bidiEngine.bidiTransform(text, "ILYNN", "VLNNN");
			}
		},

		_setTextAttr: dcl.advise({
			around: function(sup){
				return function(value){
					value = bidi.bidiPreprocess.call(this, value);
					sup.call(this, value);
				};
			}}),

		_getTextAttr: dcl.advise({
			around: function(sup){
				return function(){
					var value = sup ? sup.call(this) : this._get("text");
					return bidi.restoreText.call(this, value);
				};
			}})
	})
});
