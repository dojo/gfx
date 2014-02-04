define([
	"../_base", "dcl/dcl", "./_ShapeBase", "dojo/has", "dojo/has!dojo-bidi?./bidi/_Text"
], function (g, dcl, Shape, has, BidiText) {
	var defaultShape = {
		// summary:
		//		Defines the default Text prototype.

		// type: String
		//		Specifies this is a Text shape, value 'text'.
		type: "text",

		// x: Number
		//		The X coordinate of the text position, default value 0.
		x: 0,

		// y: Number
		//		The Y coordinate of the text position, default value 0.
		y: 0,

		// text: String
		//		The text to be displayed, default value empty string.
		text: "",

		// align:	String
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
	var Text = dcl(Shape, {
		// summary:
		//		a generic text (do not instantiate it directly)
		shape: defaultShape,

		// font: Object
		//		A font object (see gfx.defaultFont) or a font string
		font: null,

		_setFontAttr: function (newFont) {
			// summary:
			//		sets a font for text
			// newFont: Object
			//		a font object (see gfx.defaultFont) or a font string
			this._set("font",
				typeof newFont === "string" ? g.splitFontString(newFont) : g.makeParameters(g.defaultFont, newFont));
			this._setFont();
		},
		getBoundingBox: function () {
			var bbox = null, s = this._get("shape");
			if (s.text) {
				bbox = g._computeTextBoundingBox(this);
			}
			return bbox;
		}
	});
	if (has("dojo-bidi")) {
		Text = dcl([Text, BidiText], {});
		defaultShape.textDir = "";
	}
	Text.defaultShape = defaultShape;
	return Text;
});
