define([
	"require", "intern!object", "intern/chai!assert", "../utils/testUtils", "gfx/gfx"
], function (require, registerSuite, assert, tu) {

	var surface, path, legend;

	tu.registerSuite({
		name: "Surface resizing",
		setup: function () {
			surface = tu.createSurface(300, 300);
			legend = document.createElement("div");
			document.body.appendChild(legend);
		},
		teardown: function () {
			tu.destroySurface(surface);
			document.body.removeChild(legend);
		},
		afterEach: function () {
			surface = tu.clear(surface);
		},
		"relative path with cubic beziers": function () {
			legend.innerHTML = "relative path with cubic beziers";
			path = surface.createPath("m100 100 100 0 0 100c0 50-50 50-100 0s-50-100 0-100z");
			path.stroke = {color: "black", style: "longdash", width: 3};
			path.fill = "red";
			path.transform = {dx: -50, dy: -50};
			tu.compare(surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><path fill="rgb(255, 0, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="m100 100 100 0 0 100c0 50-50 50-100 0s-50-100 0-100z" d="m 100 100 100 0 0 100c 0 50-50 50-100 0s-50-100 0-100z" stroke-dasharray="24,9" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,-50.00000000,-50.00000000)"></path>',
				'canvas-nativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"be",200,250,150,250,100,200,"be",50,150,50,100,100,100,"c","fil","255,0,0,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"se",[24,9],"st","r","r"]',
				'canvas-nonativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"be",200,250,150,250,100,200,"be",50,150,50,100,100,100,"c","m",100,100,"l",200,100,"l",200,200,"be",200,250,150,250,100,200,"be",50,150,50,100,100,100,"c","fil","255,0,0,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"b","m",100,100,"m",100,100,"l",124,100,"m",133,100,"l",157,100,"m",166,100,"l",190,100,"m",199,100,"l",200,100,"m",200,100,"l",200,123,"m",200,132,"l",200,156,"m",200,165,"l",200,189,"m",200,198,"l",200,200,"m",200,200,"be",200,208.5938,198.5229,215.7104,195.8227,221.3501,"m",190.5718,229.0356,"be",185.3165,234.5107,178.1022,237.3297,169.541,237.4925,"m",160.2598,236.7189,"be",153.2966,235.4887,145.7118,232.8056,137.7531,228.6696,"m",129.7541,224.0962,"be",123.4232,220.1517,116.9173,215.3367,110.3512,209.6511,"m",103.887,203.7871,"be",102.5919,202.5583,101.296,201.296,100,200,"m",100,200,"be",95.3125,195.3125,91.0645,190.625,87.2559,185.9787,"m",81.5841,178.6506,"be",76.4514,171.6035,72.3541,164.7048,69.2921,158.1034,"m",65.9445,149.8462,"be",63.0134,141.3493,61.953,133.5042,62.7632,126.6729,"m",64.9493,118.2033,"be",67.922,111.1557,73.6007,105.807,81.9853,102.7865,"m",90.262,100.7136,"be",93.2645,100.2435,96.5105,100,100,100,"m",100,100,"l",null,null,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"absolute path with cubic bezier": function () {
			legend.innerHTML = "absolute path with cubic bezier";
			path = surface.createPath("M100 100 200 100 200 200C200 250 150 250 100 200S50 100 100 100z");
			path.stroke = {color: "black", style: "longdash", width: 3};
			path.fill = "#f80";
			path.transform = {dx: -50, dy: -50};
			tu.compare(surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><path fill="rgb(255, 136, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="M100 100 200 100 200 200C200 250 150 250 100 200S50 100 100 100z" d="M 100 100 200 100 200 200C 200 250 150 250 100 200S 50 100 100 100z" stroke-dasharray="24,9" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,-50.00000000,-50.00000000)"></path>',
				'canvas-nativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"be",200,250,150,250,100,200,"be",50,150,50,100,100,100,"c","fil","255,136,0,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"se",[24,9],"st","r","r"]',
				'canvas-nonativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"be",200,250,150,250,100,200,"be",50,150,50,100,100,100,"c","m",100,100,"l",200,100,"l",200,200,"be",200,250,150,250,100,200,"be",50,150,50,100,100,100,"c","fil","255,136,0,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"b","m",100,100,"m",100,100,"l",124,100,"m",133,100,"l",157,100,"m",166,100,"l",190,100,"m",199,100,"l",200,100,"m",200,100,"l",200,123,"m",200,132,"l",200,156,"m",200,165,"l",200,189,"m",200,198,"l",200,200,"m",200,200,"be",200,208.5938,198.5229,215.7104,195.8227,221.3501,"m",190.5718,229.0356,"be",185.3165,234.5107,178.1022,237.3297,169.541,237.4925,"m",160.2598,236.7189,"be",153.2966,235.4887,145.7118,232.8056,137.7531,228.6696,"m",129.7541,224.0962,"be",123.4232,220.1517,116.9173,215.3367,110.3512,209.6511,"m",103.887,203.7871,"be",102.5919,202.5583,101.296,201.296,100,200,"m",100,200,"be",95.3125,195.3125,91.0645,190.625,87.2559,185.9787,"m",81.5841,178.6506,"be",76.4514,171.6035,72.3541,164.7048,69.2921,158.1034,"m",65.9445,149.8462,"be",63.0134,141.3493,61.953,133.5042,62.7632,126.6729,"m",64.9493,118.2033,"be",67.922,111.1557,73.6007,105.807,81.9853,102.7865,"m",90.262,100.7136,"be",93.2645,100.2435,96.5105,100,100,100,"m",100,100,"l",null,null,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"relative path with horizontal and vertical lines, and cubic beziers": function () {
			legend.innerHTML = "relative path with horizontal and vertical lines, and cubic beziers";
			path = surface.createPath("m100 100h100v100c0 50-50 50-100 0s-50-100 0-100z");
			path.stroke = {color: "black", style: "longdash", width: 3};
			path.fill = "yellow";
			path.transform = {dx: -50, dy: -50};
			tu.compare(surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><path fill="rgb(255, 255, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="m100 100h100v100c0 50-50 50-100 0s-50-100 0-100z" d="m 100 100h 100v 100c 0 50-50 50-100 0s-50-100 0-100z" stroke-dasharray="24,9" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,-50.00000000,-50.00000000)"></path>',
				'canvas-nativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"be",200,250,150,250,100,200,"be",50,150,50,100,100,100,"c","fil","255,255,0,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"se",[24,9],"st","r","r"]',
				'canvas-nonativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"be",200,250,150,250,100,200,"be",50,150,50,100,100,100,"c","m",100,100,"l",200,100,"l",200,200,"be",200,250,150,250,100,200,"be",50,150,50,100,100,100,"c","fil","255,255,0,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"b","m",100,100,"m",100,100,"l",124,100,"m",133,100,"l",157,100,"m",166,100,"l",190,100,"m",199,100,"l",200,100,"m",200,100,"l",200,123,"m",200,132,"l",200,156,"m",200,165,"l",200,189,"m",200,198,"l",200,200,"m",200,200,"be",200,208.5938,198.5229,215.7104,195.8227,221.3501,"m",190.5718,229.0356,"be",185.3165,234.5107,178.1022,237.3297,169.541,237.4925,"m",160.2598,236.7189,"be",153.2966,235.4887,145.7118,232.8056,137.7531,228.6696,"m",129.7541,224.0962,"be",123.4232,220.1517,116.9173,215.3367,110.3512,209.6511,"m",103.887,203.7871,"be",102.5919,202.5583,101.296,201.296,100,200,"m",100,200,"be",95.3125,195.3125,91.0645,190.625,87.2559,185.9787,"m",81.5841,178.6506,"be",76.4514,171.6035,72.3541,164.7048,69.2921,158.1034,"m",65.9445,149.8462,"be",63.0134,141.3493,61.953,133.5042,62.7632,126.6729,"m",64.9493,118.2033,"be",67.922,111.1557,73.6007,105.807,81.9853,102.7865,"m",90.262,100.7136,"be",93.2645,100.2435,96.5105,100,100,100,"m",100,100,"l",null,null,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"relative path with quadratic beziers": function () {
			legend.innerHTML = "relative path with quadratic beziers";
			path = surface.createPath("m100 100 100 0 0 100q0 50-75-25t-25-75z");
			path.stroke = {color: "black", style: "longdash", width: 3};
			path.fill = "green";
			path.transform = {dx: -50, dy: -50};
			tu.compare(surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><path fill="rgb(0, 128, 0)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="m100 100 100 0 0 100q0 50-75-25t-25-75z" d="m 100 100 100 0 0 100q 0 50-75-25t-25-75z" stroke-dasharray="24,9" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,-50.00000000,-50.00000000)"></path>',
				'canvas-nativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"q",200,250,125,175,"q",50,100,100,100,"c","fil","0,128,0,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"se",[24,9],"st","r","r"]',
				'canvas-nonativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"q",200,250,125,175,"q",50,100,100,100,"c","m",100,100,"l",200,100,"l",200,200,"q",200,250,125,175,"q",50,100,100,100,"c","fil","0,128,0,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"b","m",100,100,"m",100,100,"l",124,100,"m",133,100,"l",157,100,"m",166,100,"l",190,100,"m",199,100,"l",200,100,"m",200,100,"l",200,123,"m",200,132,"l",200,156,"m",200,165,"l",200,189,"m",200,198,"l",200,200,"m",200,200,"q",200,215.625,192.6758,219.043,"m",183.9299,219.5056,"q",175.4806,217.5923,162.5889,208.275,"m",155.4722,202.8392,"q",147.1838,196.1965,137.3527,186.9825,"m",130.541,180.4701,"q",127.8237,177.8237,125,175,"m",125,175,"q",118.8477,168.8477,113.5365,163.2,"m",107.3508,156.4765,"q",98.2336,146.3284,92.1556,138.0038,"m",86.8435,130.1451,"q",77.5722,115.0725,80.8613,107.5363,"m",87.2905,101.8841,"q",92.0752,100,100,100,"m",100,100,"l",null,null,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"absolute path with quadratic bezier": function () {
			legend.innerHTML = "absolute path with quadratic bezier";
			path = surface.createPath("M100 100 200 100 200 200Q200 250 125 175T100 100z");
			path.stroke = {color: "black", style: "longdash", width: 3};
			path.fill = "blue";
			path.transform = {dx: -50, dy: -50};
			tu.compare(surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><path fill="rgb(0, 0, 255)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="M100 100 200 100 200 200Q200 250 125 175T100 100z" d="M 100 100 200 100 200 200Q 200 250 125 175T 100 100z" stroke-dasharray="24,9" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,-50.00000000,-50.00000000)"></path>',
				'canvas-nativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"q",200,250,125,175,"q",50,100,100,100,"c","fil","0,0,255,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"se",[24,9],"st","r","r"]',
				'canvas-nonativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"q",200,250,125,175,"q",50,100,100,100,"c","m",100,100,"l",200,100,"l",200,200,"q",200,250,125,175,"q",50,100,100,100,"c","fil","0,0,255,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"b","m",100,100,"m",100,100,"l",124,100,"m",133,100,"l",157,100,"m",166,100,"l",190,100,"m",199,100,"l",200,100,"m",200,100,"l",200,123,"m",200,132,"l",200,156,"m",200,165,"l",200,189,"m",200,198,"l",200,200,"m",200,200,"q",200,215.625,192.6758,219.043,"m",183.9299,219.5056,"q",175.4806,217.5923,162.5889,208.275,"m",155.4722,202.8392,"q",147.1838,196.1965,137.3527,186.9825,"m",130.541,180.4701,"q",127.8237,177.8237,125,175,"m",125,175,"q",118.8477,168.8477,113.5365,163.2,"m",107.3508,156.4765,"q",98.2336,146.3284,92.1556,138.0038,"m",86.8435,130.1451,"q",77.5722,115.0725,80.8613,107.5363,"m",87.2905,101.8841,"q",92.0752,100,100,100,"m",100,100,"l",null,null,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		},
		"relative path with horizontal and vertical lines, and quadratic beziers": function () {
			legend.innerHTML = "relative path with horizontal and vertical lines, and quadratic beziers";
			path = surface.createPath("m100 100h100v100q0 50-75-25t-25-75z");
			path.stroke = {color: "black", style: "longdash", width: 3};
			path.fill = "#f0f";
			path.transform = {dx: -50, dy: -50};
			tu.compare(surface, {
				/* jshint maxlen:100000, quotmark:single */
				svg: '<defs></defs><path fill="rgb(255, 0, 255)" fill-opacity="1" stroke="rgb(0, 0, 0)" stroke-opacity="1" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" path="m100 100h100v100q0 50-75-25t-25-75z" d="m 100 100h 100v 100q 0 50-75-25t-25-75z" stroke-dasharray="24,9" fill-rule="evenodd" transform="matrix(1.00000000,0.00000000,0.00000000,1.00000000,-50.00000000,-50.00000000)"></path>',
				'canvas-nativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"q",200,250,125,175,"q",50,100,100,100,"c","fil","255,0,255,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"se",[24,9],"st","r","r"]',
				'canvas-nonativedash': '["s","s","t",-50,-50,"ro",0,"sc",1,1,"ro",0,"b","m",100,100,"l",200,100,"l",200,200,"q",200,250,125,175,"q",50,100,100,100,"c","m",100,100,"l",200,100,"l",200,200,"q",200,250,125,175,"q",50,100,100,100,"c","fil","255,0,255,1","f","stro","0,0,0,1","li",3,"lin","butt","line","miter","mi",4,"b","m",100,100,"m",100,100,"l",124,100,"m",133,100,"l",157,100,"m",166,100,"l",190,100,"m",199,100,"l",200,100,"m",200,100,"l",200,123,"m",200,132,"l",200,156,"m",200,165,"l",200,189,"m",200,198,"l",200,200,"m",200,200,"q",200,215.625,192.6758,219.043,"m",183.9299,219.5056,"q",175.4806,217.5923,162.5889,208.275,"m",155.4722,202.8392,"q",147.1838,196.1965,137.3527,186.9825,"m",130.541,180.4701,"q",127.8237,177.8237,125,175,"m",125,175,"q",118.8477,168.8477,113.5365,163.2,"m",107.3508,156.4765,"q",98.2336,146.3284,92.1556,138.0038,"m",86.8435,130.1451,"q",77.5722,115.0725,80.8613,107.5363,"m",87.2905,101.8841,"q",92.0752,100,100,100,"m",100,100,"l",null,null,"st","r","r"]'
				/* jshint maxlen:120, quotmark:double */
			});
		}
	});
});
