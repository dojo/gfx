define([
	"../_base",
	"dcl/dcl",
	"dojo/_base/lang",
	"./_PathBase",
	"dojo/has",
	"dojo/has!dojo-bidi?./bidi/_TextPath"
], function(g, dcl, lang, Path, has, BidiTextPath){
	var defaultShape = {
		// summary:
		//		Defines the default TextPath prototype.

		// type: String
		//		Specifies this is a TextPath, value 'textpath'.
		type: "textpath",

		// path: String
		//		The path commands. See W32C SVG 1.0 specification.
		//		Defaults to empty string value.
		path: "",

		// text: String
		//		The text to be displayed, default value empty string.
		text: "",

		// align: String
		//		The horizontal text alignment, one of 'start', 'end', 'center'. Default value 'start'.
		align: "start",

		// decoration: String
		//		The text decoration , one of 'none', ... . Default value 'none'.
		decoration: "none",

		// rotated: Boolean
		//		Whether the text is rotated, boolean default value false.
		rotated: false,

		// kerning: Boolean
		//		Whether kerning is used on the text, boolean default value true.
		kerning: true
	};
	var TextPath = dcl(Path, {
		// summary:
		//		a generalized TextPath shape
		shape: defaultShape,

		// font: Object
		//		A font object (see gfx.defaultFont) or a font string
		font: null,

		// text: Object
		//		The text to be drawn along the path
		text: null,

		constructor: function(){
			// summary:
			//		a TextPath shape constructor
			this._set("text", lang.clone(TextPath.defaultShape));
			this._set("font", lang.clone(g.defaultFont));
		},
		_setTextAttr: function(newText){
			// summary:
			//		sets a text to be drawn along the path
			this._set("text", g.makeParameters(this._get("text"),
				typeof newText == "string" ? {text: newText} : newText));
			this._setText();
			return this;	// self
		},
		_setFontAttr: function(newFont){
			// summary:
			//		sets a font for text
			this._set("font", typeof newFont == "string" ?
				g.splitFontString(newFont) :
				g.makeParameters(g.defaultFont, newFont));
			this._setFont();
			return this;	// self
		}
	});
	if(has("dojo-bidi")){
		TextPath = dcl([TextPath, BidiTextPath], {});
		defaultShape.textDir = "";
	}
	TextPath.defaultShape = defaultShape;
	return TextPath;
});
