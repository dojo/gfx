define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix"
], function (registerSuite, assert, tu, gfx, m) {

	var surface;

	var textShape = { x: 20, y: 40, text: "Hello !"};

	function placeAnchor(surface, x, y) {
		surface.createLine({x1: x - 2, y1: y, x2: x + 2, y2: y}).stroke = "blue";
		surface.createLine({x1: x, y1: y - 2, x2: x, y2: y + 2}).stroke = "blue";
	}

	function makeText(surface, text, font, fill, stroke) {
		var t = surface.createText(text);
		if (font) {
			t.font = font;
		}
		if (fill) {
			t.fill = fill;
		}
		if (stroke) {
			t.stroke = stroke;
		}
		placeAnchor(surface, text.x, text.y);
		return t;
	}

	tu.registerSuite({
		name: "Text",
		setup: function () {
			surface = tu.createSurface(500, 500);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"text drawing": function () {
			var ROTATION = 30, t1, t2, t3, t4, t5, t6, t7, t8, t9;

			surface.createLine({x1: 250, y1: 0, x2: 250, y2: 500}).stroke = "green";
			t1 = makeText(surface, {x: 250, y: 50, text: "Start", align: "start"},
				{family: "Times", size: "36pt", weight: "bold"}, "black", "red");
			t1.transform = m.rotategAt(ROTATION, 250, 50);
			t2 = makeText(surface, {x: 250, y: 100, text: "Middle", align: "middle"}, {family: "Symbol", size: "24pt"},
				"red", "black");
			t2.transform = m.rotategAt(ROTATION, 250, 100);
			t3 = makeText(surface, {x: 250, y: 150, text: "End", align: "end"},
				{family: "Helvetica", style: "italic", size: "18pt", rotated: true}, "#FF8000");
			t3.transform = m.rotategAt(ROTATION, 250, 150);
			t4 = makeText(surface, {x: 250, y: 200, text: "Define Shuffle Tiff", align: "middle", kerning: true},
				{family: "serif", size: "36pt"}, "black");
			t4.transform = m.rotategAt(0, 250, 200);
			t5 = makeText(surface, {x: 250, y: 250, text: "Define Shuffle Tiff", align: "middle", kerning: false},
				{family: "serif", size: "36pt"}, "black");
			t5.transform = m.rotategAt(0, 250, 250);
			// test #14522
			t6 = makeText(surface, {x: 250, y: 290, text: 18, align: "start"},
				{family: "sans serif", size: "18pt", weight: "bold"}, "black");
			// test #16099
			t7 = makeText(surface, {x: 0, y: 0, text: "Middle", align: "middle"}, {family: "sans serif", size: "24pt"},
				"red", "black");
			t7.transform = m.translate(250, 340);
			t8 = makeText(surface, {x: 250, y: 390, text: "Number: \u200E\u202A20\u202C", align: "middle"},
				{family: "sans serif", size: "24pt"}, "red", "black");
			// a text with some descents
			t9 = makeText(surface, {x: 0, y: 0, text: "go, Dojo! go", align: "end"}, {family: "serif", size: "36pt"},
				"red", "black");
			t9.transform = m.translate(250, 440);

			tu.compare(surface, {
				/* jshint maxlen:100000, quotmark:single */
				/* jshint -W100 */
				svg: '<defs></defs><line fill="none" fill-opacity="0" stroke="rgb(0, 128, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="0" x2="250" y2="500" stroke-dasharray="none"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="50" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="bold" font-size="36pt" font-family="Times" fill-rule="evenodd" stroke-dasharray="none" transform="matrix(0.86602540,0.50000000,-0.50000000,0.86602540,58.49364905,-118.30127019)">Start</text><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="50" x2="252" y2="50" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="48" x2="250" y2="52" stroke-dasharray="none"></line><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="100" text-anchor="middle" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="Symbol" fill-rule="evenodd" stroke-dasharray="none" transform="matrix(0.86602540,0.50000000,-0.50000000,0.86602540,83.49364905,-111.60254038)">Middle</text><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="100" x2="252" y2="100" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="98" x2="250" y2="102" stroke-dasharray="none"></line><text fill="rgb(255, 128, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="150" text-anchor="end" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="italic" font-variant="normal" font-weight="normal" font-size="18pt" font-family="Helvetica" fill-rule="evenodd" transform="matrix(0.86602540,0.50000000,-0.50000000,0.86602540,108.49364905,-104.90381057)">End</text><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="150" x2="252" y2="150" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="148" x2="250" y2="152" stroke-dasharray="none"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="200" text-anchor="middle" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="36pt" font-family="serif" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)">Define Shuffle Tiff</text><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="200" x2="252" y2="200" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="198" x2="250" y2="202" stroke-dasharray="none"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="250" text-anchor="middle" text-decoration="none" rotate="0" kerning="0" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="36pt" font-family="serif" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)">Define Shuffle Tiff</text><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="250" x2="252" y2="250" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="248" x2="250" y2="252" stroke-dasharray="none"></line><text fill="rgb(0, 0, 0)" fill-opacity="1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="290" text-anchor="start" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="bold" font-size="18pt" font-family="sans serif" fill-rule="evenodd">18</text><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="290" x2="252" y2="290" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="288" x2="250" y2="292" stroke-dasharray="none"></line><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" text-anchor="middle" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="sans serif" fill-rule="evenodd" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,250.00000000,340.00000000)">Middle</text><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="-2" y1="0" x2="2" y2="0" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="-2" x2="0" y2="2" stroke-dasharray="none"></line><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="250" y="390" text-anchor="middle" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="24pt" font-family="sans serif" fill-rule="evenodd" stroke-dasharray="none">Number: ‎‪20‬</text><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="248" y1="390" x2="252" y2="390" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="250" y1="388" x2="250" y2="392" stroke-dasharray="none"></line><text fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" text-anchor="end" text-decoration="none" rotate="0" kerning="auto" text-rendering="auto" font-style="normal" font-variant="normal" font-weight="normal" font-size="36pt" font-family="serif" fill-rule="evenodd" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,250.00000000,440.00000000)">go, Dojo! go</text><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="-2" y1="0" x2="2" y2="0" stroke-dasharray="none"></line><line fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="0" y1="-2" x2="0" y2="2" stroke-dasharray="none"></line>',
				canvas: '["s","s","b","m",250,0,"l",250,500,"fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",58.4936,-118.3013,"ro",0,"sc",1,1,"ro",0.5236,"fil","0,0,0,1","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","start","fo","normal normal bold 36pt Times","fi","Start",250,50,"b","str","Start",250,50,"c","r","s","b","m",248,50,"l",252,50,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",250,48,"l",250,52,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",83.4936,-111.6025,"ro",0,"sc",1,1,"ro",0.5236,"fil","255,0,0,1","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","center","fo","normal normal normal 24pt Symbol","fi","Middle",250,100,"b","str","Middle",250,100,"c","r","s","b","m",248,100,"l",252,100,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",250,98,"l",250,102,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",108.4936,-104.9038,"ro",0,"sc",1,1,"ro",0.5236,"fil","255,128,0,1","stro","0,0,0,0.0","te","end","fo","italic normal normal 18pt Helvetica","fi","End",250,150,"r","s","b","m",248,150,"l",252,150,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",250,148,"l",250,152,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",0,0,"ro",0,"sc",1,1,"ro",0,"fil","0,0,0,1","stro","0,0,0,0.0","te","center","fo","normal normal normal 36pt serif","fi","Define Shuffle Tiff",250,200,"r","s","b","m",248,200,"l",252,200,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",250,198,"l",250,202,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",0,0,"ro",0,"sc",1,1,"ro",0,"fil","0,0,0,1","stro","0,0,0,0.0","te","center","fo","normal normal normal 36pt serif","fi","Define Shuffle Tiff",250,250,"r","s","b","m",248,250,"l",252,250,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",250,248,"l",250,252,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","fil","0,0,0,1","stro","0,0,0,0.0","te","start","fo","normal normal bold 18pt sans serif","fi",18,250,290,"r","s","b","m",248,290,"l",252,290,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",250,288,"l",250,292,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",250,340,"ro",0,"sc",1,1,"ro",0,"fil","255,0,0,1","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","center","fo","normal normal normal 24pt sans serif","fi","Middle",0,0,"b","str","Middle",0,0,"c","r","s","b","m",-2,0,"l",2,0,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,-2,"l",0,2,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","fil","255,0,0,1","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","center","fo","normal normal normal 24pt sans serif","fi","Number: ‎‪20‬",250,390,"b","str","Number: ‎‪20‬",250,390,"c","r","s","b","m",248,390,"l",252,390,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",250,388,"l",250,392,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",250,440,"ro",0,"sc",1,1,"ro",0,"fil","255,0,0,1","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"te","end","fo","normal normal normal 36pt serif","fi","go, Dojo! go",0,0,"b","str","go, Dojo! go",0,0,"c","r","s","b","m",-2,0,"l",2,0,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",0,-2,"l",0,2,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				/* jshint +W100 */
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"text.getBoundingBox": function () {
			var text = surface.createText(textShape);
			text.fill = "black";
			var bbox = text.getBoundingBox();
			assert.isTrue(bbox !== null, "Unexpected null bbox.");
			// it's impossible to test for bbox coordinates as it varies depending on the browser...
		},
		"getBoundingBox (empty string)": function () {
			var text = surface.createText();
			text.fill = "black";
			var bbox = text.getBoundingBox();
			assert.isTrue(bbox === null, "Unexpected non-null bbox.");
		},
		"getBoundingBox (orphan)": function () {
			var text = surface.createText(textShape);
			text.fill = "black";
			text.removeShape();
			var bbox = text.getBoundingBox();
			assert.isTrue(bbox !== null, "Unexpected bbox.");
			assert.isTrue(bbox.x === 0 && bbox.y === 0 && bbox.width === 0 && bbox.height === 0,
				"Unexpected non empty bbox.");
			var g = surface.createGroup();
			text = g.createText(textShape);
			g.removeShape();
			bbox = text.getBoundingBox();
			assert.isTrue(bbox !== null, "Unexpected bbox [2].");
			assert.isTrue(bbox.x === 0 && bbox.y === 0 && bbox.width === 0 && bbox.height === 0,
				"Unexpected non empty bbox.[2]");
		},
	});

	registerSuite({
		name: "Text measuring",
		"_getTextBox": function () {
			var bbox = gfx._getTextBox(textShape.text);
			assert.isTrue(bbox !== null, "Unexpected null bbox.");
			// it's impossible to test for bbox coordinates as it varies depending on the browser...
			// but at least verify that it is a {l,t,w,h} object
			assert.isTrue("l" in bbox, "Not a bbox");
			assert.isTrue("t" in bbox, "Not a bbox");
			assert.isTrue("w" in bbox, "Not a bbox");
			assert.isTrue("h" in bbox, "Not a bbox");
			assert.isTrue(bbox.w > 0, "Not a bbox");
			assert.isTrue(bbox.h > 0, "Not a bbox");
			// and that the measuring node is invisible and empty after calling the function
			assert.equal(document.body.lastChild.style.visibility, "hidden",
				"Document's last child should be invisible");
			assert.equal(document.body.lastChild.innerHTML, "", "Document's last child should be empty");
		}
	});
});
