define(["./intern"], function (intern) {
	var config = {
		proxyPort: 9000,

		proxyUrl: "http://localhost:9000/",

		capabilities: {
			"selenium-version": "2.37.0",
			"idle-timeout": 60
		},

		environments: [
			{ browserName: "internet explorer", version: "11", platform: "Windows 8.1" },
			{ browserName: "internet explorer", version: "10", platform: "Windows 8" },
			{ browserName: "internet explorer", version: "9", platform: "Windows 7" },
			{ browserName: "firefox", version: "25", platform: [ /*"OS X 10.6", "Linux", */ "Windows 7" ] },
			{ browserName: "chrome", version: "", platform: [ /*"OS X 10.6", "Linux", */ "Windows 7" ] },
			{ browserName: "iphone", platform: "OS X 10.9", version: "7" },
			{ browserName: "android", platform: "Linux", version: "4.1" },
			{ browserName: "android", platform: "Linux", version: "4.0" },
			{ browserName: "iphone", platform: "OS X 10.8", version: "6.1" },
			{ browserName: "iphone", platform: "OS X 10.8", version: "6.0" }
		],

		maxConcurrency: 1,

		useSauceConnect: true,

		webdriver: {
			host: "localhost",
			port: 4444
		},

		excludeInstrumentation: /^(requirejs|dcl|dojo|dcolor|delite|gfx\/tests)/
	};

	for (var key in intern) {
		config[key] = intern[key];
	}

	return config;
});
