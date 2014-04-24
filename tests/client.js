// Test file to run GFX unit tests from a browser
// Run using http://localhost/<root>/gfx/node_modules/intern/client.html?config=tests/client

define({
	loader: {
		// location of all the packages, relative to client.html
		baseUrl: "../../.."
	},

	// Non-functional test suites
	suites: [ "gfx/tests/unit/all" ]
});
