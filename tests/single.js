// Test file to run a single GFX unit test from a browser, as a demo/sample
// Run using http://localhost/<root>/gfx/node_modules/intern/client.html?config=tests/single&test=<test-name>

define({
	loader: {
		// location of all the packages, relative to client.html
		baseUrl: "../../.."
	},

	// Non-functional test suites
	suites: ["gfx/tests/unit/" + (location.search.match(/&test=(\w*)/) && RegExp.$1)],

	// Tell GFX unit tests to not cleanup the page when done.
	gfxVisualTest: true
});
