define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/svg"
], function (registerSuite, assert, tu) {
	var surface;
	registerSuite({
		name: "Text on path (SVG only)",
		setup: function () {
			surface = tu.createSurface(500, 500, "svg");
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"TextPath": function () {

			var CPD = 30;

			var p = surface.createPath({}).moveTo(0, 100).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 300, 100,
					300).curveTo(CPD, 0, 100 - CPD, -300, 100, -300).curveTo(CPD, 0, 100 - CPD, 300, 100,
					300).curveTo(CPD, 0, 100 - CPD, -300, 100, -300).curveTo(CPD, 0, 100 - CPD, 300, 100, 300);
			p.stroke = "green";
			var t = surface.createTextPath({
				text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent erat. " +
					"In malesuada ultricies velit. Vestibulum tempor odio vitae diam. " +
					"Morbi arcu lectus, laoreet eget, nonummy at, elementum a, quam.",
				align: "middle"
				//, rotated: true
			}).moveTo(0, 100).setAbsoluteMode(false).curveTo(CPD, 0, 100 - CPD, 300, 100, 300).curveTo(CPD, 0,
					100 - CPD, -300, 100, -300).curveTo(CPD, 0, 100 - CPD, 300, 100, 300).curveTo(CPD, 0, 100 - CPD,
					-300, 100, -300).curveTo(CPD, 0, 100 - CPD, 300, 100, 300);
			t.font = {family: "times", size: "12pt"};
			t.fill = "blue";

			tu.compare(surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs><path id="dojoxUnique1" d="M 0 100"></path><path id="dojoxUnique2" d="M 0 100c 30 0 70 300 100 300"></path><path id="dojoxUnique3" d="M 0 100c 30 0 70 300 100 300c 30 0 70-300 100-300"></path><path id="dojoxUnique4" d="M 0 100c 30 0 70 300 100 300c 30 0 70-300 100-300c 30 0 70 300 100 300"></path><path id="dojoxUnique5" d="M 0 100c 30 0 70 300 100 300c 30 0 70-300 100-300c 30 0 70 300 100 300c 30 0 70-300 100-300"></path><path id="dojoxUnique6" d="M 0 100c 30 0 70 300 100 300c 30 0 70-300 100-300c 30 0 70 300 100 300c 30 0 70-300 100-300c 30 0 70 300 100 300"></path></defs><path fill="none" fill-opacity="0" stroke="rgb(0, 128, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 0 100c 30 0 70 300 100 300c 30 0 70-300 100-300c 30 0 70 300 100 300c 30 0 70-300 100-300c 30 0 70 300 100 300" stroke-dasharray="none"></path><text fill="rgb(0, 0, 255)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" text="" align="start" decoration="none" rotated="false" kerning="true" font-style="normal" font-variant="normal" font-weight="normal" font-size="12pt" font-family="times" fill-rule="evenodd"><textPath alignment-baseline="middle" text-anchor="middle" startOffset="50%" baseline-shift="0.5ex" text-decoration="none" rotate="0" kerning="auto" xlink:href="#dojoxUnique6">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Praesent erat. In malesuada ultricies velit. Vestibulum tempor odio vitae diam. Morbi arcu lectus, laoreet eget, nonummy at, elementum a, quam.</textPath></text>'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});
});
