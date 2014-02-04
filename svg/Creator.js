define([
	"dcl/dcl", "../shape/_CreatorBase"
], function (dcl, CreatorBase) {
	return dcl([CreatorBase], {
		// summary:
		//		SVG shape creators

		_prefix: "../svg/"
	});
});
