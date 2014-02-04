define([
	"dcl/dcl"
], function (dcl) {
	return dcl(null, {
		_setFont: function () {
			// summary:
			//		sets a font object (SVG)
			var f = this.font;
			// next line doesn't work in Firefox 2 or Opera 9
			//this.rawNode.setAttribute("font", gfx.makeFontString(this.font));
			this.rawNode.setAttribute("font-style", f.style);
			this.rawNode.setAttribute("font-variant", f.variant);
			this.rawNode.setAttribute("font-weight", f.weight);
			this.rawNode.setAttribute("font-size", f.size);
			this.rawNode.setAttribute("font-family", f.family);
		}
	});
});
