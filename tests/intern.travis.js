define(["./intern"], function (intern) {

	intern.loader = {};
	intern.useLoader = {};

	intern.environments = [
		//{ browserName: "internet explorer", version: "11", platform: "Windows 8.1" },
		//{ browserName: "internet explorer", version: "10", platform: "Windows 8" },
		//{ browserName: "internet explorer", version: "9", platform: "Windows 7" },
		//{ browserName: "firefox", version: "25", platform: "Windows 7" },
		{ browserName: "chrome", version: "", platform: "Windows 7" }//,
		//{ browserName: "safari", version: "6", platform: "OS X 10.8" },

		// Mobile
		//{ browserName: "iphone", platform: "OS X 10.9", version: "7"}
		// , { browserName: "android", platform: "Android" }		not currently working
	];

	return intern;
});
