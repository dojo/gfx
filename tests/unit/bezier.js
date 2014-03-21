define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix"
], function (registerSuite, assert, tu, gfx, matrix) {
	var surface;
	tu.registerSuite({
		name: "Bezier curves",
		setup: function () {
			surface = tu.createSurface(500, 300);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"Bezier": function () {

			var g = surface.createGroup();

			// create a reference ellipse
			var rx = 200;
			var ry = 100;
			var startAngle = -30;
			var arcAngle = -90;
			var axisAngle = -30;
			var e = g.createEllipse({rx: rx, ry: ry});
			e.stroke = {};

			// calculate a bezier
			var alpha = matrix._degToRad(arcAngle) / 2; // half of our angle
			var cosa = Math.cos(alpha);
			var sina = Math.sin(alpha);
			// start point
			var p1 = {x: cosa, y: sina};
			// 1st control point
			var p2 = {x: cosa + (4 / 3) * (1 - cosa), y: sina - (4 / 3) * cosa * (1 - cosa) / sina};
			// 2nd control point (symmetric to the 1st one)
			var p3 = {x: p2.x, y: -p2.y};
			// end point (symmetric to the start point)
			var p4 = {x: p1.x, y: -p1.y};

			// rotate and scale poins as appropriate
			var s = matrix.normalize([matrix.scale(e.shape.rx, e.shape.ry), matrix.rotateg(startAngle + arcAngle / 2)]);
			p1 = matrix.multiplyPoint(s, p1);
			p2 = matrix.multiplyPoint(s, p2);
			p3 = matrix.multiplyPoint(s, p3);
			p4 = matrix.multiplyPoint(s, p4);
			// draw control trapezoid
			var t = g.createPath();
			t.stroke = {color: "blue"};
			t.moveTo(p1.x, p1.y);
			t.lineTo(p2.x, p2.y);
			t.lineTo(p3.x, p3.y);
			t.lineTo(p4.x, p4.y);
			t.lineTo(p1.x, p1.y);
			t.moveTo((p1.x + p4.x) / 2, (p1.y + p4.y) / 2);
			t.lineTo((p2.x + p3.x) / 2, (p2.y + p3.y) / 2);
			t.moveTo((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
			t.lineTo((p3.x + p4.x) / 2, (p3.y + p4.y) / 2);
			// draw a bezier
			var b = g.createPath();
			b.stroke = {color: "red"};
			b.moveTo(p1.x, p1.y);
			b.curveTo(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
			// move everything in a middle
			g.transform = [matrix.translate(250, 150), matrix.rotateg(axisAngle)];

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><g transform="matrix(0.86602540,-0.50000000,0.50000000,0.86602540,250.00000000,150.00000000)"><ellipse fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" cx="0" cy="0" rx="200" ry="100" stroke-dasharray="none"></ellipse><path fill="none" fill-opacity="0" stroke="rgb(0, 0, 255)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" stroke-dasharray="none" d="M-100.0000-86.6025L-4.3415-114.2168L 117.9766-97.8293L 173.2051-50.0000L-100.0000-86.6025M 36.6025-68.3013L 56.8176-106.0230M-52.1707-100.4097L 145.5908-73.9146"></path><path fill="none" fill-opacity="0" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" stroke-dasharray="none" d="M-100.0000-86.6025C-4.3415-114.2168 117.9766-97.8293 173.2051-50.0000"></path></g>',
				canvas: '["s","s","t",250,150,"ro",0,"sc",1,1,"ro",-0.5236,"s","b","m",184.7759,-38.2683,"be",205.0747,-13.7655,205.0747,13.7655,184.7759,38.2683,"be",164.4771,62.7712,125.5423,82.2386,76.5367,92.388,"be",27.5311,102.5373,-27.5311,102.5373,-76.5367,92.388,"be",-125.5423,82.2386,-164.4771,62.7712,-184.7759,38.2683,"be",-205.0747,13.7655,-205.0747,-13.7655,-184.7759,-38.2683,"be",-164.4771,-62.7712,-125.5423,-82.2386,-76.5367,-92.388,"be",-27.5311,-102.5373,27.5311,-102.5373,76.5367,-92.388,"be",125.5423,-82.2386,164.4771,-62.7712,184.7759,-38.2683,"c","fil","0,0,0,0.0","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",-100,-86.6025,"l",-4.3415,-114.2168,"l",117.9766,-97.8293,"l",173.2051,-50,"l",-100,-86.6025,"m",36.6025,-68.3013,"l",56.8176,-106.023,"m",-52.1707,-100.4097,"l",145.5908,-73.9146,"fil","0,0,0,0.0","stro","0,0,255,1","li",1,"lin","butt","line","miter","mi",4,"st","r","s","b","m",-100,-86.6025,"be",-4.3415,-114.2168,117.9766,-97.8293,173.2051,-50,"fil","0,0,0,0.0","stro","255,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		}
	});
});
