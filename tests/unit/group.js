define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx",
], function (registerSuite, assert, tu) {
	var surface, g1, g2, r1, shape;
	tu.registerSuite({
		name: "Group",
		setup: function () {
			surface = tu.createSurface(500, 500);

			// make a checkerboard
			for (var i = 0; i < 500; i += 100) {
				for (var j = 0; j < 500; j += 100) {
					if (i % 200 === j % 200) {
						surface.createRect({ x: i, y: j }).fill = [255, 0, 0, 0.1];
					}
				}
			}
			// create groups and shapes
			g1 = surface.createGroup();
			g2 = surface.createGroup();
			r1 = new (tu.getRendererModule().Rect)({x: 200, y: 200});
			r1.fill = "green";
			r1.stroke = {};
			g1.transform = {dy: -100};
			g2.transform = {dx: 100, dy: -100};
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		afterEach: function () {
			r1.removeShape();
		},
		"add to surface": function () {

			assert.isNull(r1.getParent(), "rectangle's parent should be null");

			surface.add(r1);

			assert.equal(r1.getParent(), surface, "rectangle's parent should be the surface");

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="400" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="100" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="300" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="400" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="100" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="300" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="400" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="400" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="400" y="400" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,-100.00000000)"></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,100.00000000,-100.00000000)"></g><rect fill="rgb(0, 128, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" stroke-dasharray="none"></rect>',
				canvas: '["s","s","b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,0,0,0.1","f","r","s","b","m",0,200,"l",100,200,"l",100,300,"l",0,300,"l",0,200,"c","fil","255,0,0,0.1","f","r","s","b","m",0,400,"l",100,400,"l",100,500,"l",0,500,"l",0,400,"c","fil","255,0,0,0.1","f","r","s","b","m",100,100,"l",200,100,"l",200,200,"l",100,200,"l",100,100,"c","fil","255,0,0,0.1","f","r","s","b","m",100,300,"l",200,300,"l",200,400,"l",100,400,"l",100,300,"c","fil","255,0,0,0.1","f","r","s","b","m",200,0,"l",300,0,"l",300,100,"l",200,100,"l",200,0,"c","fil","255,0,0,0.1","f","r","s","b","m",200,200,"l",300,200,"l",300,300,"l",200,300,"l",200,200,"c","fil","255,0,0,0.1","f","r","s","b","m",200,400,"l",300,400,"l",300,500,"l",200,500,"l",200,400,"c","fil","255,0,0,0.1","f","r","s","b","m",300,100,"l",400,100,"l",400,200,"l",300,200,"l",300,100,"c","fil","255,0,0,0.1","f","r","s","b","m",300,300,"l",400,300,"l",400,400,"l",300,400,"l",300,300,"c","fil","255,0,0,0.1","f","r","s","b","m",400,0,"l",500,0,"l",500,100,"l",400,100,"l",400,0,"c","fil","255,0,0,0.1","f","r","s","b","m",400,200,"l",500,200,"l",500,300,"l",400,300,"l",400,200,"c","fil","255,0,0,0.1","f","r","s","b","m",400,400,"l",500,400,"l",500,500,"l",400,500,"l",400,400,"c","fil","255,0,0,0.1","f","r","s","t",0,-100,"ro",0,"sc",1,1,"ro",0,"r","s","t",100,-100,"ro",0,"sc",1,1,"ro",0,"r","s","b","m",200,200,"l",300,200,"l",300,300,"l",200,300,"l",200,200,"c","fil","0,128,0,1","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"add to group 1": function () {

			assert.isNull(r1.getParent(), "rectangle's parent should be null");

			g1.add(r1);

			assert.equal(r1.getParent(), g1, "rectangle's parent should be group 1");

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="400" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="100" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="300" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="400" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="100" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="300" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="400" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="400" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="400" y="400" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,-100.00000000)"><rect fill="rgb(0, 128, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" stroke-dasharray="none"></rect></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,100.00000000,-100.00000000)"></g>',
				canvas: '["s","s","b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,0,0,0.1","f","r","s","b","m",0,200,"l",100,200,"l",100,300,"l",0,300,"l",0,200,"c","fil","255,0,0,0.1","f","r","s","b","m",0,400,"l",100,400,"l",100,500,"l",0,500,"l",0,400,"c","fil","255,0,0,0.1","f","r","s","b","m",100,100,"l",200,100,"l",200,200,"l",100,200,"l",100,100,"c","fil","255,0,0,0.1","f","r","s","b","m",100,300,"l",200,300,"l",200,400,"l",100,400,"l",100,300,"c","fil","255,0,0,0.1","f","r","s","b","m",200,0,"l",300,0,"l",300,100,"l",200,100,"l",200,0,"c","fil","255,0,0,0.1","f","r","s","b","m",200,200,"l",300,200,"l",300,300,"l",200,300,"l",200,200,"c","fil","255,0,0,0.1","f","r","s","b","m",200,400,"l",300,400,"l",300,500,"l",200,500,"l",200,400,"c","fil","255,0,0,0.1","f","r","s","b","m",300,100,"l",400,100,"l",400,200,"l",300,200,"l",300,100,"c","fil","255,0,0,0.1","f","r","s","b","m",300,300,"l",400,300,"l",400,400,"l",300,400,"l",300,300,"c","fil","255,0,0,0.1","f","r","s","b","m",400,0,"l",500,0,"l",500,100,"l",400,100,"l",400,0,"c","fil","255,0,0,0.1","f","r","s","b","m",400,200,"l",500,200,"l",500,300,"l",400,300,"l",400,200,"c","fil","255,0,0,0.1","f","r","s","b","m",400,400,"l",500,400,"l",500,500,"l",400,500,"l",400,400,"c","fil","255,0,0,0.1","f","r","s","t",0,-100,"ro",0,"sc",1,1,"ro",0,"s","b","m",200,200,"l",300,200,"l",300,300,"l",200,300,"l",200,200,"c","fil","0,128,0,1","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","s","t",100,-100,"ro",0,"sc",1,1,"ro",0,"r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"add to group 2": function () {

			assert.isNull(r1.getParent(), "rectangle's parent should be null");

			g2.add(r1);

			assert.equal(r1.getParent(), g2, "rectangle's parent should be group 2");

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="0" y="400" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="100" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="100" y="300" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="400" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="100" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="300" y="300" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="400" y="0" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="400" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><rect fill="rgb(255, 0, 0)" fill-opacity="0.1" stroke="none" stroke-opacity="0" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="400" y="400" width="100" height="100" ry="0" rx="0" fill-rule="evenodd"></rect><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,0.00000000,-100.00000000)"></g><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,100.00000000,-100.00000000)"><rect fill="rgb(0, 128, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" x="200" y="200" width="100" height="100" ry="0" rx="0" fill-rule="evenodd" stroke-dasharray="none"></rect></g>',
				canvas: '["s","s","b","m",0,0,"l",100,0,"l",100,100,"l",0,100,"l",0,0,"c","fil","255,0,0,0.1","f","r","s","b","m",0,200,"l",100,200,"l",100,300,"l",0,300,"l",0,200,"c","fil","255,0,0,0.1","f","r","s","b","m",0,400,"l",100,400,"l",100,500,"l",0,500,"l",0,400,"c","fil","255,0,0,0.1","f","r","s","b","m",100,100,"l",200,100,"l",200,200,"l",100,200,"l",100,100,"c","fil","255,0,0,0.1","f","r","s","b","m",100,300,"l",200,300,"l",200,400,"l",100,400,"l",100,300,"c","fil","255,0,0,0.1","f","r","s","b","m",200,0,"l",300,0,"l",300,100,"l",200,100,"l",200,0,"c","fil","255,0,0,0.1","f","r","s","b","m",200,200,"l",300,200,"l",300,300,"l",200,300,"l",200,200,"c","fil","255,0,0,0.1","f","r","s","b","m",200,400,"l",300,400,"l",300,500,"l",200,500,"l",200,400,"c","fil","255,0,0,0.1","f","r","s","b","m",300,100,"l",400,100,"l",400,200,"l",300,200,"l",300,100,"c","fil","255,0,0,0.1","f","r","s","b","m",300,300,"l",400,300,"l",400,400,"l",300,400,"l",300,300,"c","fil","255,0,0,0.1","f","r","s","b","m",400,0,"l",500,0,"l",500,100,"l",400,100,"l",400,0,"c","fil","255,0,0,0.1","f","r","s","b","m",400,200,"l",500,200,"l",500,300,"l",400,300,"l",400,200,"c","fil","255,0,0,0.1","f","r","s","b","m",400,400,"l",500,400,"l",500,500,"l",400,500,"l",400,400,"c","fil","255,0,0,0.1","f","r","s","t",0,-100,"ro",0,"sc",1,1,"ro",0,"r","s","t",100,-100,"ro",0,"sc",1,1,"ro",0,"s","b","m",200,200,"l",300,200,"l",300,300,"l",200,300,"l",200,200,"c","fil","0,128,0,1","f","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		},
		"add/clear/add": function () {

			shape = surface.createCircle({cx: 150, cy: 150, r: 50});
			shape.fill = "yellow";
			shape.stroke = {color: "red", width: 3};

			assert.equal(shape.getParent(), surface, "circle's parent should be the surface");

			surface.clear();

			assert.isNull(shape.getParent(), "circle's parent should be null");

			surface.add(shape);

			assert.equal(shape.getParent(), surface, "circle's parent should be the surface again");

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><circle fill="rgb(255, 255, 0)" fill-opacity="1" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="150" cy="150" r="50" fill-rule="evenodd" stroke-dasharray="none"></circle>',
				canvas: '["s","s","b","a",150,150,50,0,6.2832,1,"fil","255,255,0,1","f","stro","255,0,0,1","li",3,"lin","butt","line","miter","mi",4,"st","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		}
	});
});
