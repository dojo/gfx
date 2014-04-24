define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix", "dcolor/Color"
], function (require, registerSuite, assert, tu, gfx, m, Color) {

	var surface, surface2, image, group, image2;

	var url = require.toUrl("../images/eugene-sm.jpg");

	var suite1 = {
		name: "Image shape & transform",
		setup: function () {
			surface = tu.createSurface(500, 500);

			image = surface.createImage({width: 150, height: 100, src: url});
		},
		teardown: function () {
			tu.destroySurface(surface);
		}
	};

	function testImage(name, transform, setShape, compare) {
		suite1[name] = function () {
			image.transform = transform;
			setShape();
			return tu.compareWithImages(this, surface, compare);
		};
	}

	var t1 = {}, t2 = {dx: 100, dy: 50}, t3 = m.rotateg(15), t4 = [
		{dx: 70, dy: 90},
		{xx: 1.5, yy: 0.5}
	], t5 = [m.rotateg(15), m.skewXg(30)];

	var s1 = function () {
		image.shape = {x: 0, y: 0};
	}, s2 = function () {
		image.shape = {x: 100, y: 50};
	}, s3 = function () {
		image.shape = {x: 0, y: 0};
		image.applyRightTransform({dx: 100, dy: 50});
	};

	testImage("no transform / x=0,y=0", t1, s1, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image>',
		canvas: '["s","s","t",0,0,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("no transform / x=100,y=50", t1, s2, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"></image>',
		canvas: '["s","s","t",0,0,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",100,50,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("no transform / dx=100,dy=50", t1, s3, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="50" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"></image>',
		canvas: '["s","s","t",100,50,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("translate / x=0,y=0", t2, s1, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,100.00000000,50.00000000)"></image>',
		canvas: '["s","s","t",100,50,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("translate / x=100,y=50", t2, s2, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="50" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,100.00000000,50.00000000)"></image>',
		canvas: '["s","s","t",100,50,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",100,50,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("translate / dx=100,dy=50", t2, s3, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,200.00000000,100.00000000)"></image>',
		canvas: '["s","s","t",200,100,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("rotate / x=0,y=0", t3, s1, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(0.96592583,0.25881905,-0.25881905,0.96592583,0.00000000,0.00000000)"></image>',
		canvas: '["s","s","t",0,0,"ro",0,"sc",1,1,"ro",0.2618,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("rotate / x=100,y=50", t3, s2, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="50" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(0.96592583,0.25881905,-0.25881905,0.96592583,0.00000000,0.00000000)"></image>',
		canvas: '["s","s","t",0,0,"ro",0,"sc",1,1,"ro",0.2618,"d","../../../gfx/tests/images/eugene-sm.jpg",100,50,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("rotate / dx=100,dy=50", t3, s3, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(0.96592583,0.25881905,-0.25881905,0.96592583,83.65163037,74.17819582)"></image>',
		canvas: '["s","s","t",83.6516,74.1782,"ro",0,"sc",1,1,"ro",0.2618,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("scale / x=0,y=0", t4, s1, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.50000000,0.00000000,0.00000000,0.50000000,70.00000000,90.00000000)"></image>',
		canvas: '["s","s","t",70,90,"ro",0,"sc",1.5,0.5,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("scale / x=100,y=50", t4, s2, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="50" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.50000000,0.00000000,0.00000000,0.50000000,70.00000000,90.00000000)"></image>',
		canvas: '["s","s","t",70,90,"ro",0,"sc",1.5,0.5,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",100,50,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("scale / dx=100,dy=50", t4, s3, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.50000000,0.00000000,0.00000000,0.50000000,220.00000000,115.00000000)"></image>',
		canvas: '["s","s","t",220,115,"ro",0,"sc",1.5,0.5,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("skew / x=0,y=0", t5, s1, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(0.96592583,0.25881905,0.29885849,1.11535507,0.00000000,0.00000000)"></image>',
		canvas: '["s","s","t",0,0,"ro",0.9067,"sc",1.3295,0.7522,"ro",-0.9259,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("skew / x=100,y=50", t5, s2, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="50" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(0.96592583,0.25881905,0.29885849,1.11535507,0.00000000,0.00000000)"></image>',
		canvas: '["s","s","t",0,0,"ro",0.9067,"sc",1.3295,0.7522,"ro",-0.9259,"d","../../../gfx/tests/images/eugene-sm.jpg",100,50,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});
	testImage("skew / dx=100,dy=50", t5, s3, {
		/* jshint maxlen:100000, quotmark:single */
		svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(0.96592583,0.25881905,0.29885849,1.11535507,111.53550717,81.64965809)"></image>',
		canvas: '["s","s","t",111.5355,81.6497,"ro",0.9067,"sc",1.3295,0.7522,"ro",-0.9259,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
		/* jshint maxlen:120, quotmark:double */
	});

	tu.registerSuite(suite1);

	tu.registerSuite({
		name: "Images (2)",
		setup: function () {
			surface = tu.createSurface(500, 500);

			group = surface.createGroup();
			var rect = group.createRect({x: 0, y: 0, width: 200, height: 200});
			rect.stroke = "black";
			rect.fill = new Color([255, 0, 255, 0.5]);

			image = surface.createImage({width: 150, height: 100, src: url});

			group.add(image);

			// static images to see how the size

			surface.createImage({x: 0, y: 200, width: 150, height: 100, src: url});
			surface.createImage({x: 0, y: 300, width: 300, height: 100, src: url});
			surface.createImage({x: 300, y: 200, width: 150, height: 200, src: url});

			group.moveToFront();
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"no transform": function () {
			return tu.compareWithImages(this, surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="200" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="300" width="300" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="200" width="150" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image><g><rect fill="rgb(255, 0, 255)" fill-opacity="0.5" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="200" height="200" ry="0" rx="0" stroke-dasharray="none" fill-rule="evenodd"></rect><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image></g>',
				canvas: '["s","s","d","../../../gfx/tests/images/eugene-sm.jpg",0,200,150,100,"fil","0,0,0,0.0","r","s","d","../../../gfx/tests/images/eugene-sm.jpg",0,300,300,100,"fil","0,0,0,0.0","r","s","d","../../../gfx/tests/images/eugene-sm.jpg",300,200,150,200,"fil","0,0,0,0.0","r","s","s","b","m",0,0,"l",200,0,"l",200,200,"l",0,200,"l",0,0,"c","fil","255,0,255,0.5","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"transform": function () {
			group.transform = [gfx.matrix.rotategAt(45, 200, 200), {dx: 200, dy: 200}];

			return tu.compareWithImages(this, surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="200" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="300" width="300" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="200" width="150" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image><g transform="matrix(0.70710678,0.70710678,-0.70710678,0.70710678,200.00000000,200.00000000)"><rect fill="rgb(255, 0, 255)" fill-opacity="0.5" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="200" height="200" ry="0" rx="0" stroke-dasharray="none" fill-rule="evenodd"></rect><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg"></image></g>',
				canvas: '["s","s","d","../../../gfx/tests/images/eugene-sm.jpg",0,200,150,100,"fil","0,0,0,0.0","r","s","d","../../../gfx/tests/images/eugene-sm.jpg",0,300,300,100,"fil","0,0,0,0.0","r","s","d","../../../gfx/tests/images/eugene-sm.jpg",300,200,150,200,"fil","0,0,0,0.0","r","s","t",200,200,"ro",0,"sc",1,1,"ro",0.7854,"s","b","m",0,0,"l",200,0,"l",200,200,"l",0,200,"l",0,0,"c","fil","255,0,255,0.5","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});

	tu.registerSuite({
		name: "Image scaling",
		setup: function () {
			surface = tu.createSurface(800, 600);
			var dn = surface._parent;
			dn.style.backgroundColor = "red";

			surface2 = tu.createSurface(600, 600);
			dn = surface2._parent;
			dn.style.overflow = "auto";
			dn.style.backgroundColor = "red";
			dn.style.width = "602px";
			dn.style.height = "602px";

			image = surface.createImage({width: 150, height: 100, src: url});
			image2 = surface2.createImage({width: 150, height: 100, src: url});
		},
		teardown: function () {
			tu.destroySurface(surface);
			tu.destroySurface(surface2);
		},
		"no scale": function () {

			surface.setDimensions(800, 600);
			image.transform = {};

			return tu.compareWithImages(this, surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"></image>',
				canvas: '["s","s","t",0,0,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"scaled": function () {

			surface.setDimensions(1000, 600);
			image.transform = {xx: 6, yy: 6};

			return tu.compareWithImages(this, surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(6.00000000,0.00000000,0.00000000,6.00000000,0.00000000,0.00000000)"></image>',
				canvas: '["s","s","t",0,0,"ro",0,"sc",6,6,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"no scale, overflow=auto": function () {

			surface2.setDimensions(600, 600);
			image2.transform = null;

			return tu.compareWithImages(this, surface2, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,0.00000000)"></image>',
				canvas: '["s","s","t",0,0,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"scaled, overflow=auto": function () {

			surface2.setDimensions(800, 600);
			image2.transform = {xx: 5, yy: 5};

			return tu.compareWithImages(this, surface2, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="150" height="100" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(5.00000000,0.00000000,0.00000000,5.00000000,0.00000000,0.00000000)"></image>',
				canvas: '["s","s","t",0,0,"ro",0,"sc",5,5,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,150,100,"fil","0,0,0,0.0","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});

	tu.registerSuite({
		name: "Image opacity",
		setup: function () {
			surface = tu.createSurface(800, 600);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"opacity": function () {

			var rect1 = surface.createRect({ x: 0, y: 0, width: 300, height: 200, r: 5 });
			rect1.fill = "red";
			rect1.stroke = "black";
			var img1 = surface.createImage({ width: 300, height: 200, src: url});
			img1.transform = { dx: 50, dy: 50 };
			var rect2 = surface.createRect({ x: 100, y: 100, width: 300, height: 200, r: 5 });
			rect2.fill = "yellow";
			rect2.stroke = "black";
			var img2 = surface.createImage({ width: 300, height: 200, src: require.toUrl("../images/eugene-sm.gif")});
			img2.transform = { dx: 150, dy: 150 };
			var rect3 = surface.createRect({ x: 200, y: 200, width: 300, height: 200, r: 5 });
			rect3.fill = "green";
			rect3.stroke = "black";
			var img3 = surface.createImage({ width: 300, height: 200, src: require.toUrl("../images/eugene-sm.png")});
			img3.transform = { dx: 250, dy: 250 };
			var rect4 = surface.createRect({ x: 300, y: 300, width: 300, height: 200, r: 5 });
			rect4.fill = "blue";
			rect4.stroke = "black";

			return tu.compareWithImages(this, surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><rect fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="300" height="200" ry="5" rx="5" fill-rule="evenodd" stroke-dasharray="none"></rect><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="300" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.jpg" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,50.00000000,50.00000000)"></image><rect fill="rgb(255, 255, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="100" width="300" height="200" ry="5" rx="5" fill-rule="evenodd" stroke-dasharray="none"></rect><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="300" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.gif" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,150.00000000,150.00000000)"></image><rect fill="rgb(0, 128, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="200" width="300" height="200" ry="5" rx="5" fill-rule="evenodd" stroke-dasharray="none"></rect><image fill-opacity="0" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="300" height="200" preserveAspectRatio="none" xlink:href="../../../gfx/tests/images/eugene-sm.png" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,250.00000000,250.00000000)"></image><rect fill="rgb(0, 0, 255)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="300" width="300" height="200" ry="5" rx="5" fill-rule="evenodd" stroke-dasharray="none"></rect>',
				canvas: '["s","s","b","m",5,0,"a",295,5,5,-1.5708,0,false,"a",295,195,5,0,1.5708,false,"a",5,195,5,1.5708,3.1416,false,"a",5,5,5,3.1416,4.7124,false,"c","fil","255,0,0,1","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",50,50,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.jpg",0,0,300,200,"fil","0,0,0,0.0","r","s","b","m",105,100,"a",395,105,5,-1.5708,0,false,"a",395,295,5,0,1.5708,false,"a",105,295,5,1.5708,3.1416,false,"a",105,105,5,3.1416,4.7124,false,"c","fil","255,255,0,1","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",150,150,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.gif",0,0,300,200,"fil","0,0,0,0.0","r","s","b","m",205,200,"a",495,205,5,-1.5708,0,false,"a",495,395,5,0,1.5708,false,"a",205,395,5,1.5708,3.1416,false,"a",205,205,5,3.1416,4.7124,false,"c","fil","0,128,0,1","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","t",250,250,"ro",0,"sc",1,1,"ro",0,"d","../../../gfx/tests/images/eugene-sm.png",0,0,300,200,"fil","0,0,0,0.0","r","s","b","m",305,300,"a",595,305,5,-1.5708,0,false,"a",595,495,5,0,1.5708,false,"a",305,495,5,1.5708,3.1416,false,"a",305,305,5,3.1416,4.7124,false,"c","fil","0,0,255,1","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
	});
});
