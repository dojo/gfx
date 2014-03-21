// Test file to run infrastructure tests locally.
// Run using "runlocal.sh"

define({
	// Browsers to run tests against
	environments: [
		{ browserName: "chrome" },
		{ browserName: "firefox" },
		{ browserName: "internet explorer" }
	],

	// Whether or not to start Sauce Connect before running tests
	useSauceConnect: false,

	// Non-functional test suite(s) to run in each browser
	suites: [ "gfx/tests/unit/all" ],

	// Functional test suite(s) to run in each browser once non-functional tests are completed
	//functionalSuites: [ "gfx/tests/functional/all" ],

	maxConcurrency: 3,

	webdriver: {
		host: "localhost",
		port: 4444
	},

	// A regular expression matching URLs to files that should not be included in code coverage analysis
	excludeInstrumentation: /^(requirejs|dcl|dojo|dcolor|delite|gfx\/tests)/
});
