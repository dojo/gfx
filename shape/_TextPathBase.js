define([
	"../_base",
	"dcl/dcl",
	"dojo/_base/lang",
	"./_PathBase"
], function(g, dcl, lang, Path){
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
		constructor: function(){
			// summary:
			//		a TextPath shape constructor
			if(!("text" in this)){
				this.text = lang.clone(TextPath.defaultShape);
			}
			if(!("fontStyle" in this)){
				this.fontStyle = lang.clone(g.defaultFont);
			}
		},
		getText: function(){
			// summary:
			//		returns the current text object or null
			return this.text;	// Object
		},
		setText: function(newText){
			// summary:
			//		sets a text to be drawn along the path
			this.text = g.makeParameters(this.text,
				typeof newText == "string" ? {text: newText} : newText);
			this._setText();
			return this;	// self
		},
		getFont: function(){
			// summary:
			//		returns the current font object or null
			return this.fontStyle;	// Object
		},
		setFont: function(newFont){
			// summary:
			//		sets a font for text
			this.fontStyle = typeof newFont == "string" ?
				g.splitFontString(newFont) :
				g.makeParameters(g.defaultFont, newFont);
			this._setFont();
			return this;	// self
		}
	});
	TextPath.defaultShape = defaultShape;
	return TextPath;
});
