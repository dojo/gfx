define([
	"intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx", "gfx/matrix"
], function (registerSuite, assert, tu, gfx, m) {
	var surface;
	tu.registerSuite({
		name: "Arc test",
		setup: function () {
			surface = tu.createSurface(300, 300);
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"arc shape": function () {
			var g1 = surface.createGroup();
			var g2 = g1.createGroup();

			var rx = 100, ry = 60, xRotg = -30;
			var startPoint = m.multiplyPoint(m.rotateg(xRotg), {x: -rx, y: 0  });
			var endPoint = m.multiplyPoint(m.rotateg(xRotg), {x: 0, y: -ry});

			var re1 = g1.createPath().moveTo(startPoint).arcTo(rx, ry, xRotg, true, false, endPoint);
			re1.stroke = {color: "red", width: 3};
			var ge1 = g1.createPath().moveTo(re1.getLastPosition()).arcTo(rx, ry, xRotg, false, false, startPoint);
			ge1.stroke = {color: "black"};
			var re2 = g2.createPath().moveTo(startPoint).arcTo(rx, ry, xRotg, false, true, endPoint);
			re2.stroke = {color: "green", width: 3};
			var ge2 = g2.createPath().moveTo(re2.getLastPosition()).arcTo(rx, ry, xRotg, true, true, startPoint);
			ge2.stroke = {color: "black"};

			g1.transform = {dx: 200, dy: 200};
			g2.transform = {dx: 10, dy: 10};

			/* jshint maxlen:100000, quotmark:single */
			tu.compare(surface, {
				svg: '<defs></defs><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,200.00000000,200.00000000)"><g transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,10.00000000,10.00000000)"><path fill="none" fill-opacity="0" stroke="rgb(0, 128, 0)" stroke-opacity="1" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M-86.6025 50.0000A 100 60-30 0 1-30.0000-51.9615" stroke-dasharray="none"></path><path fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M-30.0000-51.9615A 100 60-30 1 1-86.6025 50.0000" stroke-dasharray="none"></path></g><path fill="none" fill-opacity="0" stroke="rgb(255, 0, 0)" stroke-opacity="1" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M-86.6025 50.0000A 100 60-30 1 0-30.0000-51.9615" stroke-dasharray="none"></path><path fill="none" fill-opacity="0" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="" d="M-30.0000-51.9615A 100 60-30 0 0-86.6025 50.0000" stroke-dasharray="none"></path></g>',
				'canvas-nativedash': '["s","s","t",200,200,"ro",0,"sc",1,1,"ro",0,"s","t",10,10,"ro",0,"sc",1,1,"ro",0,"s","b","m",-86.6025,50,"be",-94.559,36.2189,-93.0655,17.7345,-82.4504,-1.387,"be",-71.8354,-20.5085,-52.9684,-38.7007,-30,-51.9615,"fil","0,0,0,0.0","stro","0,128,0,1","li",3,"lin","butt","line","miter","mi",4,"st","r","s","b","m",-30,-51.9615,"be",-7.0316,-65.2223,18.1568,-72.4655,40.024,-72.0977,"be",61.8913,-71.7298,78.646,-63.7811,86.6025,-50,"be",94.559,-36.2189,93.0655,-17.7345,82.4504,1.387,"be",71.8354,20.5085,52.9684,38.7007,30,51.9615,"be",7.0316,65.2223,-18.1568,72.4655,-40.024,72.0977,"be",-61.8913,71.7298,-78.646,63.7811,-86.6025,50,"fil","0,0,0,0.0","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","s","b","m",-86.6025,50,"be",-78.646,63.7811,-61.8913,71.7298,-40.024,72.0977,"be",-18.1568,72.4655,7.0316,65.2223,30,51.9615,"be",52.9684,38.7007,71.8354,20.5085,82.4504,1.387,"be",93.0655,-17.7345,94.559,-36.2189,86.6025,-50,"be",78.646,-63.7811,61.8913,-71.7298,40.024,-72.0977,"be",18.1568,-72.4655,-7.0316,-65.2223,-30,-51.9615,"fil","0,0,0,0.0","stro","255,0,0,1","li",3,"lin","butt","line","miter","mi",4,"st","r","s","b","m",-30,-51.9615,"be",-52.9684,-38.7007,-71.8354,-20.5085,-82.4504,-1.387,"be",-93.0655,17.7345,-94.559,36.2189,-86.6025,50,"fil","0,0,0,0.0","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","r"]',
				'canvas-nonativedash': '["s","s","t",200,200,"ro",0,"sc",1,1,"ro",0,"s","t",10,10,"ro",0,"sc",1,1,"ro",0,"s","b","m",-86.6025,50,"be",-94.559,36.2189,-93.0655,17.7345,-82.4504,-1.387,"be",-71.8354,-20.5085,-52.9684,-38.7007,-30,-51.9615,"m",-86.6025,50,"be",-94.559,36.2189,-93.0654,17.7345,-82.4504,-1.387,"be",-71.8354,-20.5085,-52.9684,-38.7007,-30,-51.9615,"fil","0,0,0,0.0","stro","0,128,0,1","li",3,"lin","butt","line","miter","mi",4,"st","r","s","b","m",-30,-51.9615,"be",-7.0316,-65.2223,18.1568,-72.4655,40.024,-72.0977,"be",61.8913,-71.7298,78.646,-63.781,86.6025,-50,"be",94.559,-36.2189,93.0655,-17.7345,82.4505,1.387,"be",71.8354,20.5085,52.9684,38.7007,30,51.9615,"be",7.0316,65.2224,-18.1568,72.4656,-40.024,72.0977,"be",-61.8913,71.7298,-78.646,63.7811,-86.6025,50,"m",-30,-51.9615,"be",-7.0316,-65.2223,18.1568,-72.4655,40.024,-72.0977,"be",61.8913,-71.7298,78.6461,-63.7811,86.6026,-50,"be",94.5591,-36.219,93.0655,-17.7345,82.4505,1.387,"be",71.8355,20.5085,52.9685,38.7007,30.0001,51.9615,"be",7.0317,65.2223,-18.1567,72.4655,-40.024,72.0977,"be",-61.8912,71.7298,-78.646,63.7811,-86.6025,50,"fil","0,0,0,0.0","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","s","b","m",-86.6025,50,"be",-78.646,63.7811,-61.8913,71.7298,-40.024,72.0977,"be",-18.1568,72.4655,7.0316,65.2223,30,51.9615,"be",52.9684,38.7007,71.8354,20.5085,82.4504,1.387,"be",93.0655,-17.7345,94.559,-36.2189,86.6025,-50,"be",78.646,-63.7811,61.8913,-71.7298,40.024,-72.0977,"be",18.1568,-72.4655,-7.0316,-65.2223,-30,-51.9615,"m",-86.6025,50,"be",-78.646,63.7811,-61.8912,71.7298,-40.024,72.0977,"be",-18.1568,72.4655,7.0316,65.2223,30,51.9615,"be",52.9685,38.7007,71.8355,20.5085,82.4505,1.387,"be",93.0655,-17.7345,94.5591,-36.2189,86.6026,-50,"be",78.6461,-63.7811,61.8913,-71.7298,40.0241,-72.0977,"be",18.1569,-72.4655,-7.0316,-65.2223,-30,-51.9615,"fil","0,0,0,0.0","stro","255,0,0,1","li",3,"lin","butt","line","miter","mi",4,"st","r","s","b","m",-30,-51.9615,"be",-52.9684,-38.7007,-71.8354,-20.5085,-82.4504,-1.387,"be",-93.0655,17.7345,-94.559,36.219,-86.6025,50,"m",-30,-51.9615,"be",-52.9684,-38.7007,-71.8354,-20.5085,-82.4504,-1.387,"be",-93.0654,17.7345,-94.559,36.219,-86.6025,50,"fil","0,0,0,0.0","stro","0,0,0,1","li",1,"lin","butt","line","miter","mi",4,"st","r","r","r"]'
			});
			/* jshint maxlen:120, quotmark:double */
		}
	});
});
