// Test file to run GFX tests from a browser
// Run using http://localhost/gfx/node_modules/intern/client.html?config=tests/client
define(["./intern"], function (intern) {
	var config = {
		loader: {
			baseUrl: "../../.."
		}
	};

	for (var key in intern) {
		config[key] = intern[key];
	}

	return config;
});
