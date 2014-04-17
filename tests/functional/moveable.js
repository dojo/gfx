define([
	"intern!object", "intern/chai!assert", "require"
], function (registerSuite, assert, require) {

		var TIMEOUT = 120000;

		registerSuite({
			name: "GFX move interaction",
			"events": function () {
				this.timeout = TIMEOUT;
				var r = this.remote;
				var p = r.get(require.toUrl("./moveable.html"));
				if(/(iphone|safari)/.test(r.environmentType.browserName)){
					// mouse events not fully implemented in Appium
					return p;
				}
				return p.waitForCondition("gfxTest.ready", TIMEOUT)
					.elementById("circle")
					.moveTo(50, 50)
					.buttonDown()
					.moveTo(150, 150)
					.buttonUp()
					.execute("return gfxTest.circle.getBoundingBox();").then(function (bbox) {
						assert.deepEqual(bbox, {x:0, y:0, width:100, height: 100}, "circle not moved correctly");
					});
			}
		});
	}
);
