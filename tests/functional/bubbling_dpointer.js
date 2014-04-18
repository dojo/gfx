define([
	"intern!object", "intern/chai!assert", "require"
], function (registerSuite, assert, require) {

		function checkEvents(e, p, id, expected) {
			p = p.elementById(id);
			p = p.click();
			p = p.wait(300);
			p = p.execute("return gfxTest.checkEvents(" + JSON.stringify(expected) + ");").then(function (status) {
				var m = "[" + e + "] " + "click " + id + ": " + status;
				//console.log(m);
				assert(/^OK/.test(status), m);
			});
			p = p.end();
			return p;
		}

		var TIMEOUT = 120000;

		registerSuite({
			name: "GFX event handling / bubbling using ibm-js/dpointer",
			"events": function () {
				this.timeout = TIMEOUT;
				var r = this.remote;
				var e = this.remote.environmentType;
				e = e.browserName + " " + e.version + " " + e.platform;
				var p = r.get(require.toUrl("./bubbling_dpointer.html")).waitForCondition("gfxTest.ready", TIMEOUT);
				p = checkEvents(e, p, "rect1", [
					"move rect1 rect1",
					"move surface rect1",
					"down rect1 rect1",
					"down g rect1",
					"down surface rect1",
					"up rect1 rect1"
				]);
				p = checkEvents(e, p, "rect2", [
					"move rect2 rect2",
					"move surface rect2",
					"down g rect2",
					"down surface rect2"
				]);
				p = checkEvents(e, p, "rect3", [
					"move surface null",
					"down g rect3",
					"down surface rect3"
				]);
				p = checkEvents(e, p, "surface", [
					"down surface null"
				]);
				return p;
			}
		});
	}

);
