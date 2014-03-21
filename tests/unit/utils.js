define([
	"intern!object", "intern/chai!assert", "dojo/json", "../utils/testUtils", "gfx/gfx", "gfx/utils"
], function (registerSuite, assert, JSON, tu, gfx, utils) {

	var surface, img = "http://demos.dojotoolkit.org/demos/resources/images/no_thumb.gif";

	var checkJSON = function (json) {
		var obj = JSON.parse(json);
		assert.equal(2, obj.length, "Checking that the json is an array of two entries.");
		assert.isTrue(obj[0].shape !== null, "Checking that a first shape object is present.");
		assert.equal(obj[0].shape.type, "rect", "Checking that the shape type is rect.");
		assert.equal(obj[0].shape.width, 100, "Checking that the width is 100.");
		assert.equal(obj[0].shape.height, 100, "Checking that the height is 100.");
		assert.isTrue(obj[1].shape !== null, "Checking that a second shape object is present.");
		assert.equal(obj[1].shape.type, "image", "Checking that the shape type is image.");
		assert.equal(obj[1].shape.width, 200, "Checking that the width is 200.");
		assert.equal(obj[1].shape.height, 200, "Checking that the height is 200.");
		assert.equal(obj[1].shape.src, img, "Checking that the image source is correct.");
	};

	tu.registerSuite({
		name: "Utilities",
		setup: function () {
			surface = tu.createSurface(300, 300);
			var r = surface.createRect({
				width: 100,
				height: 100,
				x: 100,
				y: 100
			});
			r.fill = "blue";
			r.stroke = "black";
			surface.createImage({width: 200, height: 200,
				src: img});
		},
		teardown: function () {
			tu.destroySurface(surface);
		},
		"toJson": function () {
			var json = utils.toJson(surface);
			assert.isTrue(json !== null, "Checking that non-null was returned.");
			checkJSON(json);
		},
		"fromJson": function () {
			var json = utils.toJson(surface);
			assert.isTrue(json !== null, "Checking that non-null was returned.");
			var tempSurface = tu.createSurface(300, 300);
			utils.fromJson(tempSurface, json);
			var nsJson = utils.toJson(tempSurface);
			tu.destroySurface(tempSurface);
			checkJSON(nsJson);
		},
		"toSvg": function () {
			if (tu.renderer === "svg") { // TODO: ahem, is this supposed to work with the canvas renderer?
				var d = this.async(10000);
				utils.toSvg(surface).then(d.callback(function (svg) {
					assert.isTrue(svg !== null, "Checking that non-null was returned.");
					assert.isTrue(svg.length > 0, "Checking that svg length > 0");
					var low = svg.toLowerCase();
					assert.isTrue(low.indexOf("<svg") === 0, "Checking that the string starts with SVG open tag.");
					assert.isTrue(low.indexOf("xmlns:xlink=\"http://www.w3.org/1999/xlink\"") !== -1,
						"Checking the xmlns:xlink attribute.");
					assert.isFalse(/\s+href\s*=/g.test(low), "Checking there's no href attributes.");
					assert.isTrue(low.indexOf("xlink:href=") !== -1, "Checking the xlink:href attribute.");
					assert.isTrue(low.indexOf("<img") === -1, "Checking the <img> cleanup.");
					assert.isTrue(svg.indexOf("_gfxObject") === -1, "Checking _gfxObject attribute cleanup.");
				}));
				return d;
			}
		},
		"serialize/deserialize": function () {
			var sObj = utils.serialize(surface);
			assert.isTrue(sObj !== null, "Checking that non-null was returned.");

			//Lets try to deserialize it!
			var tempSurface = tu.createSurface(300, 300);
			utils.deserialize(tempSurface, sObj);
			var nsJson = utils.toJson(tempSurface);
			tu.destroySurface(tempSurface);
			checkJSON(nsJson);
		}
	});
});
