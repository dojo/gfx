// Test file to run a single GFX unit test from a browser, as a demo/sample
// Run using http://localhost/<root>/gfx/node_modules/intern/client.html?config=tests/single&test=<test-name>

if (typeof window !== "undefined") {
	// TODO: replace this by a config property when switching to intern 1.6
	window.__gfxVisualTest = true;
}

define({
	loader: {
		// location of all the packages, relative to client.html
		baseUrl: "../../.."
	},

	// Non-functional test suites
	suites: ["gfx/tests/unit/" + (location.search.match(/&test=(\w*)/) && RegExp.$1)]
});
