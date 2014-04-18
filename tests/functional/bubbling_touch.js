define([
	"intern!object", "intern/chai!assert", "require"
], function (registerSuite, assert, require) {

		function checkEvents(e, p, id, expected) {
			p = p.elementById(id);
			p = p.click();
			p = p.wait(300);
			p = p.execute("return gfxTest.checkEvents(" + JSON.stringify(expected) + ");").then(function (status) {
				var m = "[" + e + "] " + "click " + id + ": " + status;
				console.log(m);
				assert(/^OK/.test(status), m);
			});
			p = p.end();
			return p;
		}

		var TIMEOUT = 120000;

		registerSuite({
			name: "GFX event handling / bubbling",
			"events": function () {
				this.timeout = TIMEOUT;
				var r = this.remote;
				var e = this.remote.environmentType;
				e = e.browserName + " " + e.version + " " + e.platform + " " + e.platformVersion;
				var p = r.get(require.toUrl("./bubbling_touch.html")).waitForCondition("gfxTest.ready", TIMEOUT);
				p = checkEvents(e, p, "rect1", [
					"over rect1 rect1",
					"move rect1 rect1",
					"move surface rect1",
					"press rect1 rect1",
					"press g rect1",
					"press surface rect1",
					"release rect1 rect1"
				]);
				p = checkEvents(e, p, "rect2", [
					"over rect2 rect2",
					"move rect2 rect2",
					"move surface rect2",
					"press g rect2",
					"press surface rect2"
				]);
				p = checkEvents(e, p, "rect3", [
					"over rect3 rect3",
					"over rect3 rect3",
					"move surface null",
					"press g rect3",
					"press surface rect3"
				]);
				p = checkEvents(e, p, "surface", [
					"press surface null"
				]);
				return p;
			}
		});
	}

);
