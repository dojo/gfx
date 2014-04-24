define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix", "dcolor/Color"
], function (registerSuite, assert, tu, gfx, matrix, Color) {

	var surface, rect = { x: 0, y: 0, width: 100, height: 100 };

	var s; // shape var used all around

	function createTestSurface(suffix, testName) {
		return tu.createSurface(300, 300, tu.renderer, suffix, testName);
	}

	var getSuite = function (suffix, create) {
		var name = "All shapes, using " + suffix;
		return {
			name: name,
			afterEach: function() {
				tu.destroySurface(surface);
			},
			"rect": function () {
				surface = createTestSurface(suffix, "rect");
				var redRect = create(surface, "Rect", rect);
				redRect.fill = [255, 0, 0, 0.5];
				redRect.stroke = {color: "blue", width: 10, join: "round" };
				redRect.transform = {dx: 100, dy: 100};
				//dojo.connect(redRect.getNode(), "onclick", function(){ alert("red"); });
				redRect.connect("onclick", function () {
					alert("red");
				});
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><rect fill="rgb(255, 0, 0)" fill-opacity="0.5" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="10" stroke-linecap="butt" stroke-linejoin="round" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,100.00000000,100.00000000)"></rect>',
					canvas: '["s","s","t",100,100,"ro",0,"sc",1,1,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,0,0,0.5","f","stro","0,0,255,1","li",10,"lin","butt","line","round","st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			"straightRect": function () {
				surface = createTestSurface(suffix, "straightRect");
				var blueRect = create(surface, "Rect", rect);
				blueRect.fill = [0, 255, 0, 0.5];
				blueRect.transform = { dx: 100, dy: 100 };
				blueRect.connect("onclick", function () {
					blueRect.shape = {width: blueRect.shape.width + 20};
				});
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><rect fill="rgb(0, 255, 0)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,100.00000000,100.00000000)"></rect>',
					canvas: '["s","s","t",100,100,"ro",0,"sc",1,1,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","0,255,0,0.5","f","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			"rotatedRect": function () {
				surface = createTestSurface(suffix, "rotatedRect");
				// anonymous 30 degree CCW rotated green rectangle
				var rect = create(surface, "Rect", {r: 20});
				rect.fill = [0, 0, 255, 0.5];
				// rotate it around its center and move to (100, 100)
				rect.transform = [matrix.translate(100, 100), matrix.rotategAt(-30, 0, 0)];
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><rect fill="rgb(0, 0, 255)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="20" rx="20" fill-rule="evenodd" transform="matrix(0.86602540,-0.50000000,0.50000000,0.86602540,100.00000000,100.00000000)"></rect>',
					canvas: '["s","s","t",100,100,"ro",0,"sc",1,1,"ro",-0.5236,"b","m",20,0,"a",80,20,20,-1.5708,0,false,"a",80,80,20,0,1.5708,false,"a",20,80,20,1.5708,3.1416,false,"a",20,20,20,3.1416,4.7124,false,"c","fil","0,0,255,0.5","f","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			"skewRect": function () {
				surface = createTestSurface(suffix, "skewRect");
				// anonymous red rectangle
				s = create(surface, "Rect", rect);
				s.fill = new Color([255, 0, 0, 0.5]);
				// skew it around LB point -30d, rotate it around LB point 30d, and move it to (100, 100)
				s.transform = [matrix.translate(100, 100), matrix.rotategAt(-30, 0, 100), matrix.skewXgAt(30, 0, 100)];
				// anonymous blue rectangle
				s = create(surface, "Rect", rect);
				s.fill = new Color([0, 0, 255, 0.5]);
				// skew it around LB point -30d, and move it to (100, 100)
				s.transform = [matrix.translate(100, 100), matrix.skewXgAt(30, 0, 100)];
				// anonymous yellow rectangle
				s = create(surface, "Rect", rect);
				s.fill = new Color([255, 255, 0, 0.25]);
				// move it to (100, 100)
				s.transform = matrix.translate(100, 100);
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><rect fill="rgb(255, 0, 0)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(0.86602540,-0.50000000,1.00000000,0.57735027,0.00000000,142.26497308)"></rect><rect fill="rgb(0, 0, 255)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.57735027,1.00000000,42.26497308,100.00000000)"></rect><rect fill="rgb(255, 255, 0)" fill-opacity="0.25" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,100.00000000,100.00000000)"></rect>',
					canvas: '["s","s","t",0,142.265,"ro",0.1213,"sc",1.3295,0.7522,"ro",-0.9259,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,0,0,0.5","f","r","s","t",42.265,100,"ro",0.6449,"sc",1.3295,0.7522,"ro",-0.9259,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","0,0,255,0.5","f","r","s","t",100,100,"ro",0,"sc",1,1,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,255,0,0.25","f","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			"matrixRect": function () {
				surface = createTestSurface(suffix, "matrixRect");
				var group = create(surface, "Group");

				s = create(group, "Rect", rect);
				s.fill = [0, 0, 255, 0.5];
				s.applyTransform(matrix.identity);

				s = create(group, "Rect", rect);
				s.fill = [0, 255, 0, 0.5];
				s.applyTransform(matrix.translate(30, 40));

				s = create(group, "Rect", rect);
				s.fill = [255, 0, 0, 0.5];
				s.applyTransform(matrix.rotateg(-30));

				s = create(group, "Rect", rect);
				s.fill = [0, 255, 255, 0.5];
				s.applyTransform(matrix.scale({x: 1.5, y: 0.5}));
				s.applyTransform(matrix.translate(-40, 220));

				s = create(group, "Rect", rect);
				s.fill = [0, 0, 255, 0.5];
				s.fill = [255, 0, 255, 0.5];
				s.applyTransform(matrix.flipX);

				s = create(group, "Rect", rect);
				s.fill = [0, 0, 255, 0.5];
				s.fill = [255, 255, 0, 0.5];
				s.applyTransform(matrix.flipY);

				s = create(group, "Rect", rect);
				s.fill = [0, 0, 255, 0.5];
				s.fill = [128, 0, 128, 0.5];
				s.applyTransform(matrix.flipXY);

				s = create(group, "Rect", rect);
				s.fill = [0, 0, 255, 0.5];
				s.fill = [255, 128, 0, 0.5];
				s.applyTransform(matrix.skewXg(-15));

				s = create(group, "Rect", rect);
				s.fill = [0, 0, 255, 0.5];
				s.fill = [0, 0, 0, 0.5];
				s.applyTransform(matrix.skewYg(-50));

				// move
				group.transform = { xx: 1.5, yy: 0.5, dx: 100, dy: 100 };
				group.applyTransform(matrix.rotateg(-30));

				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><g transform="matrix(1.29903811,-0.25000000,0.75000000,0.43301270,100.00000000,100.00000000)"><rect fill="rgb(0, 0, 255)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"></rect><rect fill="rgb(0, 255, 0)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,30.00000000,40.00000000)"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(0.86602540,-0.50000000,0.50000000,0.86602540,0.00000000,0.00000000)"></rect><rect fill="rgb(0, 255, 255)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.50000000,0.00000000,0.00000000,0.50000000,-60.00000000,110.00000000)"></rect><rect fill="rgb(255, 0, 255)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(-1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"></rect><rect fill="rgb(255, 255, 0)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,-1.00000000,0.00000000,0.00000000)"></rect><rect fill="rgb(128, 0, 128)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(-1.00000000,0.00000000,0.00000000,-1.00000000,0.00000000,0.00000000)"></rect><rect fill="rgb(255, 128, 0)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,-0.26794919,1.00000000,0.00000000,0.00000000)"></rect><rect fill="rgb(0, 0, 0)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.00000000,-1.19175359,0.00000000,1.00000000,0.00000000,0.00000000)"></rect></g>',
					canvas: '["s","s","t",100,100,"ro",0,"sc",1.5,0.5,"ro",-0.5236,"s","t",0,0,"ro",0,"sc",1,1,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","0,0,255,0.5","f","r","s","t",30,40,"ro",0,"sc",1,1,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","0,255,0,0.5","f","r","s","t",0,0,"ro",0,"sc",1,1,"ro",-0.5236,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,0,0,0.5","f","r","s","t",-60,110,"ro",0,"sc",1.5,0.5,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","0,255,255,0.5","f","r","s","t",0,0,"ro",0,"sc",-1,1,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,0,255,0.5","f","r","s","t",0,0,"ro",0,"sc",1,-1,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,255,0,0.5","f","r","s","t",0,0,"ro",0,"sc",-1,-1,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","128,0,128,0.5","f","r","s","t",0,0,"ro",-0.7188,"sc",1.1429,0.875,"ro",0.852,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,128,0,0.5","f","r","s","t",0,0,"ro",-1.0541,"sc",1.76,0.5682,"ro",0.5167,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","0,0,0,0.5","f","r","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test circle
			"circle": function () {
				surface = createTestSurface(suffix, "circle");
				var circle = { cx: 130, cy: 130, r: 50 };
				s = create(surface, "Circle", circle);
				s.fill = [0, 255, 0, 0.5];
				s.transform = { dx: 20, dy: 20 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><circle fill="rgb(0, 255, 0)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="130" cy="130" r="50" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,20.00000000,20.00000000)"></circle>',
					canvas: '["s","s","t",20,20,"ro",0,"sc",1,1,"ro",0,"b","a",130,130,50,0,6.2832,1,"fil","0,255,0,0.5","f","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test line
			"line": function () {
				surface = createTestSurface(suffix, "line");
				var line = { x1: 20, y1: 20, x2: 100, y2: 120 };
				s = create(surface, "Line", line);
				s.fill = [255, 0, 0, 0.5];
				s.stroke = {color: "red", width: 1};
				s.transform = { dx: 70, dy: 100 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><line fill="rgb(255, 0, 0)" fill-opacity="0.5" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x1="20" y1="20" x2="100" y2="120" fill-rule="evenodd" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,70.00000000,100.00000000)"></line>',
					canvas: '["s","s","t",70,100,"ro",0,"sc",1,1,"ro",0,"b","m",20,20,"l",100,120,"fil","255,0,0,0.5","f","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test ellipse
			"ellipse": function () {
				surface = createTestSurface(suffix, "ellipse");
				var ellipse = { cx: 50, cy: 80, rx: 50, ry: 80 };
				s = create(surface, "Ellipse", ellipse);
				s.fill = [0, 255, 255, 0.5];
				s.transform = { dx: 30, dy: 70 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><ellipse fill="rgb(0, 255, 255)" fill-opacity="0.5" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="50" cy="80" rx="50" ry="80" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,30.00000000,70.00000000)"></ellipse>',
					canvas: '["s","s","t",30,70,"ro",0,"sc",1,1,"ro",0,"b","m",96.194,49.3853,"be",101.2687,68.9876,101.2687,91.0124,96.194,110.6147,"be",91.1193,130.2169,81.3856,145.7908,69.1342,153.9104,"be",56.8828,162.0299,43.1172,162.0299,30.8658,153.9104,"be",18.6144,145.7908,8.8807,130.2169,3.806,110.6147,"be",-1.2687,91.0124,-1.2687,68.9876,3.806,49.3853,"be",8.8807,29.7831,18.6144,14.2092,30.8658,6.0896,"be",43.1172,-2.0299,56.8828,-2.0299,69.1342,6.0896,"be",81.3856,14.2092,91.1193,29.7831,96.194,49.3853,"c","fil","0,255,255,0.5","f","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test polyline
			"polyline": function () {
				surface = createTestSurface(suffix, "polyline");
				var points = [
					{x: 10, y: 20},
					{x: 40, y: 70},
					{x: 120, y: 50},
					{x: 90, y: 90}
				];
				s = create(surface, "Polyline", points);
				s.fill = null;
				s.stroke = { color: "blue", width: 1 };
				s.transform = { dx: 15, dy: 0 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><polyline fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" points="10.00000000 20.00000000 40.00000000 70.00000000 120.00000000 50.00000000 90.00000000 90.00000000" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,15.00000000,0.00000000)"></polyline>',
					canvas: '["s","s","t",15,0,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"l",40,70,"l",120,50,"l",90,90,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test polygon
			"polygon": function () {
				surface = createTestSurface(suffix, "polygon");
				var points2 = [
					{x: 100, y: 0},
					{x: 200, y: 40},
					{x: 180, y: 150},
					{x: 60, y: 170},
					{x: 20, y: 100}
				];
				s = create(surface, "Polyline", points2);
				s.fill = [0, 128, 255, 0.6];
				s.transform = {dx: 30, dy: 20};
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><polyline fill="rgb(0, 128, 255)" fill-opacity="0.6" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" points="100.00000000 0.00000000 200.00000000 40.00000000 180.00000000 150.00000000 60.00000000 170.00000000 20.00000000 100.00000000" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,30.00000000,20.00000000)"></polyline>',
					canvas: '["s","s","t",30,20,"ro",0,"sc",1,1,"ro",0,"b","m",100,0,"l",200,40,"l",180,150,"l",60,170,"l",20,100,"fil","0,128,255,0.6","f","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test path: lineTo, moveTo, closePath
			"lineTo": function () {
				surface = createTestSurface(suffix, "lineTo");
				s = create(surface, "Path").moveTo(10, 20).lineTo(80, 150).setAbsoluteMode(false).lineTo(40,
						0).setAbsoluteMode(true).lineTo(180, 100).setAbsoluteMode(false).lineTo(0, -30).lineTo(-30,
						-50).closePath();
				s.stroke = { color: "red", width: 1 };
				s.fill = null;
				s.transform = { dx: 10, dy: 18 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><path fill="none" fill-opacity="0" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 10 20L 80 150l 40 0L 180 100l 0-30l-30-50Z" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,10.00000000,18.00000000)"></path>',
					'canvas-nativedash': '["s","s","t",10,18,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"l",80,150,"l",120,150,"l",180,100,"l",180,70,"l",150,20,"c","fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]',
					'canvas-nonativedash': '["s","s","t",10,18,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"l",80,150,"l",120,150,"l",180,100,"l",180,70,"l",150,20,"c","m",10,20,"l",80,150,"l",120,150,"l",180,100,"l",180,70,"l",150,20,"c","fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			"setPath": function () {
				surface = createTestSurface(suffix, "setPath");
				s = create(surface, "Path").moveTo(10, 20).lineTo(80, 150).setAbsoluteMode(false).lineTo(40,
						0).setAbsoluteMode(true).lineTo(180, 100).setAbsoluteMode(false).lineTo(0, -30).lineTo(-30,
						-50).curveTo(10, -80, -150, -10, -90, -10).closePath();
				s.stroke = { color: "red", width: 1 };
				s.fill = null;
				s.transform = { dx: 10, dy: 58 };

				s = create(surface, "Path", {
					path: "M10,20 L80,150 l40,0 L180,100 l0,-30 l-30,-50 c10,-80 -150,-10 -90,-10 z"
				});
				s.fill = null;
				s.stroke = { color: "blue", width: 1 };
				s.transform = { dx: 50, dy: 78 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><path fill="none" fill-opacity="0" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 10 20L 80 150l 40 0L 180 100l 0-30l-30-50c 10-80-150-10-90-10Z" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,10.00000000,58.00000000)"></path><path fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="M10,20 L80,150 l40,0 L180,100 l0,-30 l-30,-50 c10,-80 -150,-10 -90,-10 z" d="M 10 20L 80 150l 40 0L 180 100l 0-30l-30-50c 10-80-150-10-90-10z" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,50.00000000,78.00000000)"></path>',
					'canvas-nativedash': '["s","s","t",10,58,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"l",80,150,"l",120,150,"l",180,100,"l",180,70,"l",150,20,"be",160,-60,0,10,60,10,"c","fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",50,78,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"l",80,150,"l",120,150,"l",180,100,"l",180,70,"l",150,20,"be",160,-60,0,10,60,10,"c","fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]',
					'canvas-nonativedash': '["s","s","t",10,58,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"l",80,150,"l",120,150,"l",180,100,"l",180,70,"l",150,20,"be",160,-60,0,10,60,10,"c","m",10,20,"l",80,150,"l",120,150,"l",180,100,"l",180,70,"l",150,20,"be",160,-60,0,10,60,10,"c","fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",50,78,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"l",80,150,"l",120,150,"l",180,100,"l",180,70,"l",150,20,"be",160,-60,0,10,60,10,"c","m",10,20,"l",80,150,"l",120,150,"l",180,100,"l",180,70,"l",150,20,"be",160,-60,0,10,60,10,"c","fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			}, // test arcTo
			"arcTo": function () {
				surface = createTestSurface(suffix, "arcTo");
				var m = matrix;
				var g1 = create(surface, "Group");
				var g2 = create(g1, "Group");

				var rx = 100, ry = 60, xRotg = 30;
				var startPoint = m.multiplyPoint(m.rotateg(xRotg), {x: -rx, y: 0  });
				var endPoint = m.multiplyPoint(m.rotateg(xRotg), {x: 0, y: -ry});

				s = create(g1, "Path").moveTo(startPoint).arcTo(rx, ry, xRotg, true, false, endPoint);
				var re1 = s;
				s.stroke = {color: "red"};
				s = create(g1, "Path").moveTo(re1.getLastPosition()).arcTo(rx, ry, xRotg, false, false, startPoint);
				s.stroke = {color: "blue"};
				s = create(g2, "Path").moveTo(startPoint).arcTo(rx, ry, xRotg, false, true, endPoint);
				var re2 = s;
				s.stroke = {color: "red"};
				s = create(g2, "Path").moveTo(re2.getLastPosition()).arcTo(rx, ry, xRotg, true, true, startPoint);
				s.stroke = {color: "blue"};

				g1.transform = {dx: 150, dy: 150};
				g2.transform = {dx: 10, dy: 10};
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,150.00000000,150.00000000)"><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,10.00000000,10.00000000)"><path fill="none" fill-opacity="0" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M-86.6025-50A 100 60 30 0 1 30-51.9615" stroke-dasharray="none"></path><path fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 30-51.9615A 100 60 30 1 1-86.6025-50" stroke-dasharray="none"></path></g><path fill="none" fill-opacity="0" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M-86.6025-50A 100 60 30 1 0 30-51.9615" stroke-dasharray="none"></path><path fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 30-51.9615A 100 60 30 0 0-86.6025-50" stroke-dasharray="none"></path></g>',
					'canvas-nativedash': '["s","s","t",150,150,"ro",0,"sc",1,1,"ro",0,"s","t",10,10,"ro",0,"sc",1,1,"ro",0,"s","b","m",-86.6025,-50,"be",-78.646,-63.7811,-61.8913,-71.7298,-40.024,-72.0977,"be",-18.1568,-72.4655,7.0316,-65.2223,30,-51.9615,"fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",30,-51.9615,"be",52.9684,-38.7007,71.8354,-20.5085,82.4504,-1.387,"be",93.0655,17.7345,94.559,36.2189,86.6025,50,"be",78.646,63.7811,61.8913,71.7298,40.024,72.0977,"be",18.1568,72.4655,-7.0316,65.2223,-30,51.9615,"be",-52.9684,38.7007,-71.8354,20.5085,-82.4504,1.387,"be",-93.0655,-17.7345,-94.559,-36.2189,-86.6025,-50,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","s","b","m",-86.6025,-50,"be",-94.559,-36.2189,-93.0655,-17.7345,-82.4504,1.387,"be",-71.8354,20.5085,-52.9684,38.7007,-30,51.9615,"be",-7.0316,65.2223,18.1568,72.4655,40.024,72.0977,"be",61.8913,71.7298,78.646,63.7811,86.6025,50,"be",94.559,36.2189,93.0655,17.7345,82.4504,-1.387,"be",71.8354,-20.5085,52.9684,-38.7007,30,-51.9615,"fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",30,-51.9615,"be",7.0316,-65.2223,-18.1568,-72.4655,-40.024,-72.0977,"be",-61.8913,-71.7298,-78.646,-63.7811,-86.6025,-50,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","r"]',
					'canvas-nonativedash': '["s","s","t",150,150,"ro",0,"sc",1,1,"ro",0,"s","t",10,10,"ro",0,"sc",1,1,"ro",0,"s","b","m",-86.6025,-50,"be",-78.646,-63.7811,-61.8913,-71.7298,-40.024,-72.0977,"be",-18.1568,-72.4655,7.0316,-65.2223,30,-51.9615,"m",-86.6025,-50,"be",-78.646,-63.781,-61.8912,-71.7298,-40.024,-72.0977,"be",-18.1568,-72.4655,7.0316,-65.2223,30,-51.9615,"fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",30,-51.9615,"be",52.9684,-38.7007,71.8354,-20.5085,82.4504,-1.387,"be",93.0655,17.7345,94.559,36.219,86.6025,50,"be",78.646,63.7811,61.8912,71.7298,40.024,72.0977,"be",18.1568,72.4656,-7.0316,65.2224,-30,51.9615,"be",-52.9684,38.7007,-71.8354,20.5085,-82.4505,1.387,"be",-93.0655,-17.7345,-94.559,-36.2189,-86.6025,-50,"m",30,-51.9615,"be",52.9684,-38.7007,71.8354,-20.5085,82.4505,-1.387,"be",93.0655,17.7345,94.5591,36.219,86.6026,50,"be",78.6461,63.7811,61.8913,71.7299,40.0241,72.0977,"be",18.1569,72.4656,-7.0315,65.2224,-30,51.9616,"be",-52.9684,38.7007,-71.8354,20.5086,-82.4504,1.3871,"be",-93.0655,-17.7345,-94.559,-36.2189,-86.6025,-50,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","s","b","m",-86.6025,-50,"be",-94.559,-36.2189,-93.0655,-17.7345,-82.4504,1.387,"be",-71.8354,20.5085,-52.9684,38.7007,-30,51.9615,"be",-7.0316,65.2223,18.1568,72.4655,40.024,72.0977,"be",61.8913,71.7298,78.646,63.7811,86.6025,50,"be",94.559,36.2189,93.0655,17.7345,82.4504,-1.387,"be",71.8354,-20.5085,52.9684,-38.7007,30,-51.9615,"m",-86.6025,-50,"be",-94.559,-36.219,-93.0655,-17.7345,-82.4505,1.387,"be",-71.8354,20.5085,-52.9685,38.7007,-30,51.9615,"be",-7.0316,65.2224,18.1568,72.4656,40.024,72.0977,"be",61.8912,71.7299,78.646,63.7811,86.6025,50.0001,"be",94.5591,36.219,93.0655,17.7346,82.4505,-1.3869,"be",71.8355,-20.5084,52.9685,-38.7007,30,-51.9615,"fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",30,-51.9615,"be",7.0316,-65.2223,-18.1568,-72.4655,-40.024,-72.0977,"be",-61.8913,-71.7298,-78.646,-63.781,-86.6025,-50,"m",30,-51.9615,"be",7.0316,-65.2223,-18.1568,-72.4655,-40.024,-72.0976,"be",-61.8912,-71.7298,-78.646,-63.781,-86.6025,-50,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test path: curveTo, smoothCurveTo
			"curveTo": function () {
				surface = createTestSurface(suffix, "curveTo");
				s = create(surface, "Path").moveTo(10, 20).curveTo(50, 50, 50, 100, 150, 100).smoothCurveTo(300, 300,
					200, 200);
				s.stroke = { color: "green", width: 1 };
				s.fill = null;
				s.transform = { dx: 10, dy: 30 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><path fill="none" fill-opacity="0" stroke="rgb(0, 128, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 10 20C 50 50 50 100 150 100S 300 300 200 200" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,10.00000000,30.00000000)"></path>',
					'canvas-nativedash': '["s","s","t",10,30,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"be",50,50,50,100,150,100,"be",250,100,300,300,200,200,"fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]',
					'canvas-nonativedash': '["s","s","t",10,30,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"be",50,50,50,100,150,100,"be",250,100,300,300,200,200,"m",10,20,"be",50,50,50,100,150,100,"be",250,100,300,300,200,200,"fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test path: curveTo, smoothCurveTo with relative.
			"curveTo2": function () {
				surface = createTestSurface(suffix, "curveTo2");
				s = create(surface, "Path").moveTo(10, 20).curveTo(50, 50, 50, 100, 150,
						100).setAbsoluteMode(false).smoothCurveTo(150, 200, 50,
						100).setAbsoluteMode(true).smoothCurveTo(50, 100, 10, 230);
				s.stroke = { color: "green", width: 1 };
				s.fill = null;
				s.transform = { dx: 10, dy: 30 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><path fill="none" fill-opacity="0" stroke="rgb(0, 128, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 10 20C 50 50 50 100 150 100s 150 200 50 100S 50 100 10 230" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,10.00000000,30.00000000)"></path>',
					'canvas-nativedash': '["s","s","t",10,30,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"be",50,50,50,100,150,100,"be",250,100,300,300,200,200,"be",100,100,50,100,10,230,"fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]',
					'canvas-nonativedash': '["s","s","t",10,30,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"be",50,50,50,100,150,100,"be",250,100,300,300,200,200,"be",100,100,50,100,10,230,"m",10,20,"be",50,50,50,100,150,100,"be",250,100,300,300,200,200,"be",100,100,50,100,10,230,"fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test path: curveTo, smoothCurveTo with relative.
			"qCurveTo": function () {
				surface = createTestSurface(suffix, "qCurveTo");
				s = create(surface, "Path").moveTo(10, 15).qCurveTo(50, 50, 100, 100).qSmoothCurveTo(150, 20);
				s.stroke = { color: "green", width: 1 };
				s.fill = null;
				s.transform = { dx: 10, dy: 30 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><path fill="none" fill-opacity="0" stroke="rgb(0, 128, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 10 15Q 50 50 100 100T 150 20" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,10.00000000,30.00000000)"></path>',
					'canvas-nativedash': '["s","s","t",10,30,"ro",0,"sc",1,1,"ro",0,"b","m",10,15,"q",50,50,100,100,"q",150,150,150,20,"fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]',
					'canvas-nonativedash': '["s","s","t",10,30,"ro",0,"sc",1,1,"ro",0,"b","m",10,15,"q",50,50,100,100,"q",150,150,150,20,"m",10,15,"q",50,50,100,100,"q",150,150,150,20,"fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			"qCurveTo2": function () {
				surface = createTestSurface(suffix, "qCurveTo2");
				s = create(surface, "Path").moveTo(10, 20).qCurveTo(50, 50, 100,
						100).setAbsoluteMode(false).qSmoothCurveTo(50, -80).setAbsoluteMode(true).qSmoothCurveTo(200,
						80);
				s.stroke = { color: "green", width: 1 };
				s.fill = null;
				s.transform = { dx: 10, dy: 30 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs></defs><path fill="none" fill-opacity="0" stroke="rgb(0, 128, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M 10 20Q 50 50 100 100t 50-80T 200 80" stroke-dasharray="none" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,10.00000000,30.00000000)"></path>',
					'canvas-nativedash': '["s","s","t",10,30,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"q",50,50,100,100,"q",150,150,150,20,"q",150,-110,200,80,"fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]',
					'canvas-nonativedash': '["s","s","t",10,30,"ro",0,"sc",1,1,"ro",0,"b","m",10,20,"q",50,50,100,100,"q",150,150,150,20,"q",150,-110,200,80,"m",10,20,"q",50,50,100,100,"q",150,150,150,20,"q",150,-110,200,80,"fil","0,0,0,0.0","stro","0,128,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			// test defines, linearGradient
			"linearGradient": function () {
				surface = createTestSurface(suffix, "linearGradient");
				// this is an example to split the linearGradient from _setFillAttr:
				var lg = {
					type: "linear",
					x1: 0,
					y1: 0,
					x2: 75,
					y2: 50,
					colors: [
						{ offset: 0, color: "#F60" },
						{ offset: 1, color: "#FF6" }
					]
				};
				s = create(surface, "Rect", rect);
				s.fill = lg;
				s.transform = { dx: 40, dy: 100 };
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs><linearGradient id="dojoxUnique1" gradientUnits="userSpaceOnUse" x1="0.00000000" y1="0.00000000" x2="75.00000000" y2="50.00000000"><stop offset="0.00000000" stop-color="rgb(255, 102, 0)" stop-opacity="1"></stop><stop offset="1.00000000" stop-color="rgb(255, 255, 102)" stop-opacity="1"></stop></linearGradient></defs><rect fill="url(#dojoxUnique1)" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,40.00000000,100.00000000)"></rect>',
					canvas: '["s","s","t",40,100,"ro",0,"sc",1,1,"ro",0,"b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil",["l",0,0,75,50,0,"255,102,0,1",1,"255,255,102,1"],"f","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			},
			"radialGradient": function () {
				surface = createTestSurface(suffix, "radialGradient");
				// this is a total inline implementation compared with previous one.
				var rg = {
					type: "radial",
					cx: 100,
					cy: 100,
					r: 100,
					colors: [
						{ offset: 0, color: "red" },
						{ offset: 0.5, color: "green" },
						{ offset: 1, color: "blue" }
					]
				};
				s = create(surface, "Circle", {cx: 100, cy: 100, r: 100});
				s.stroke = {};
				s.fill = rg;
				s.transform = {dx: 40, dy: 30};
				/* jshint maxlen:100000, quotmark:single */
				tu.compare(surface, {
					svg: '<defs><radialGradient id="dojoxUnique2" gradientUnits="userSpaceOnUse" cx="100.00000000" cy="100.00000000" r="100.00000000"><stop offset="0.00000000" stop-color="rgb(255, 0, 0)" stop-opacity="1"></stop><stop offset="0.50000000" stop-color="rgb(0, 128, 0)" stop-opacity="1"></stop><stop offset="1.00000000" stop-color="rgb(0, 0, 255)" stop-opacity="1"></stop></radialGradient></defs><circle fill="url(#dojoxUnique2)" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="100" cy="100" r="100" stroke-dasharray="none" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,40.00000000,30.00000000)"></circle>',
					canvas: '["s","s","t",40,30,"ro",0,"sc",1,1,"ro",0,"b","a",100,100,100,0,6.2832,1,"fil",["r",100,100,0,100,100,100,0,"255,0,0,1",0.5,"0,128,0,1",1,"0,0,255,1"],"f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				});
				/* jshint maxlen:120, quotmark:double */
			}
		};
	};

	tu.registerSuite(getSuite("constructors", function create(container, shapeType, shapeObj) {
		var shape = new (tu.getRendererModule()[shapeType])(shapeObj);
		container.add(shape);
		return shape;
	}));

	tu.registerSuite(getSuite("createXxx funcs", function create(container, shapeType, shapeObj) {
		return container["create" + shapeType](shapeObj);
	}));


});
