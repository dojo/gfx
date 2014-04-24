define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix"
], function (require, registerSuite, assert, tu, gfx, matrix) {
	var surface, parent, g, s;
	registerSuite({
		name: "SVG rendering options",
		setup: function () {
			surface = tu.createSurface(700, 500, "svg");
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		afterEach: function () {
			surface.clear();
		},
		"shape-rendering": function () {
			["auto", "optimizeSpeed", "crispEdges", "geometricPrecision"].forEach(function (opt, idx) {
				g = surface.createGroup();
				g.transform = matrix.translate(0, 20 * idx);
				s = g.createLine({
					x1: 10,
					y1: 10,
					x2: 490,
					y2: 100
				});
				s.stroke = "blue";
				s.addRenderingOption("shape-rendering", opt);
				s = g.createText({
					x: 490,
					y: 100,
					text: opt
				});
				s.fill = "black";
			});
			parent = surface.createGroup();
			parent.transform = matrix.translate(0, 80);
			["auto", "optimizeSpeed", "crispEdges", "geometricPrecision"].forEach(function (opt, idx) {
				g = parent.createGroup();
				g.transform = matrix.translate(0, 20 * idx);
				s = g.createLine({
					x1: 10,
					y1: 100,
					x2: 490,
					y2: 100
				});
				s.stroke = "blue";
				s.addRenderingOption("shape-rendering", opt);
				s = g.createText({
					x: 490,
					y: 100,
					text: opt
				});
				s.fill = "black";
			});
			tu.compare(surface, {
				/* jshint maxlen:1000000, quotmark:single */
				svg: '<defs></defs><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="10" x2="490" y2="100" stroke-dasharray="none" shape-rendering="auto"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">auto</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,20.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="10" x2="490" y2="100" stroke-dasharray="none" shape-rendering="optimizeSpeed"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">optimizeSpeed</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,40.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="10" x2="490" y2="100" stroke-dasharray="none" shape-rendering="crispEdges"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">crispEdges</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,60.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="10" x2="490" y2="100" stroke-dasharray="none" shape-rendering="geometricPrecision"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">geometricPrecision</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,80.00000000)"><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="100" x2="490" y2="100" stroke-dasharray="none" shape-rendering="auto"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">auto</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,20.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="100" x2="490" y2="100" stroke-dasharray="none" shape-rendering="optimizeSpeed"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">optimizeSpeed</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,40.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="100" x2="490" y2="100" stroke-dasharray="none" shape-rendering="crispEdges"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">crispEdges</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,60.00000000)"><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="10" y1="100" x2="490" y2="100" stroke-dasharray="none" shape-rendering="geometricPrecision"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="490" y="100" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd">geometricPrecision</text></g></g>'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"text-rendering": function () {
			parent = surface.createGroup();
			["auto", "optimizeSpeed", "optimizeLegibility", "geometricPrecision"].forEach(function (opt, idx) {
				g = parent.createGroup();
				g.transform = matrix.translate(0, 20 * idx);
				s = g.createText({
					x: 50,
					y: 50,
					text: "LYoWAT	ff fi fl ffl  (" + opt + ")"
				});
				s.fill = "black";
				s.font = {size: "23px", family: "Calibri, Constantia"};
				s.addRenderingOption("text-rendering", opt);
			});
			tu.compare(surface, {
				/* jshint maxlen:1000000, quotmark:single */
				svg: '<defs></defs><g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="normal" font-size="23px" font-family="Calibri, Constantia">LYoWAT	ff fi fl ffl  (auto)</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,20.00000000)"><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="optimizeSpeed" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="normal" font-size="23px" font-family="Calibri, Constantia">LYoWAT	ff fi fl ffl  (optimizeSpeed)</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,40.00000000)"><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="optimizeLegibility" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="normal" font-size="23px" font-family="Calibri, Constantia">LYoWAT	ff fi fl ffl  (optimizeLegibility)</text></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,60.00000000)"><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="50" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="geometricPrecision" fill-rule="evenodd" font-style="normal" font-variant="normal" font-weight="normal" font-size="23px" font-family="Calibri, Constantia">LYoWAT	ff fi fl ffl  (geometricPrecision)</text></g></g>'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});
});
