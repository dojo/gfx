define([
	"intern", "intern!object", "intern/chai!assert", "gfx/svg", "gfx/canvas", "./canvasRecorder", "gfx/canvas/_base"
], function (intern, registerSuite, assert, svg, canvas, canvasRecorder, canvasBase) {

	// summary:
	//		GFX test utilities to facilitate testing GFX with Intern.

	var debug = false; // print SVG tree while comparing

	function normalizeImage(src) {
		return src.replace(/^.*gfx/g, "gfx");
	}

	function dumpSVG(surface) {
		return surface.rawNode.innerHTML;
	}

	function compareSVG(surface, expected) {
		var d = surface.getDimensions();
		expected = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"" +
			" overflow=\"hidden\" width=\"" + d.width + "\" height=\"" + d.height + "\" style=\"" +
			surface.rawNode.style + "\">" + expected + "</svg>";
		var svg = new DOMParser().parseFromString(expected, "text/xml").documentElement;
		compareSVGRecursive(surface.rawNode, svg, "");
	}

	function compareSVGRecursive(aNode, eNode, indent) { // a = actual, e = expected

		assert.isNotNull(aNode, "Actual node is null whereas expected node is " + (eNode ? eNode.tagName : "null"));
		assert.isNotNull(eNode, "Expected node is null whereas actual node is " + (aNode ? aNode.tagName : "null"));

		assert.equal(aNode.nodeType, eNode.nodeType, "Nodes have different types");

		if (aNode.nodeType === 3) {
			// Text nodes
			assert.equal(aNode.nodeValue, eNode.nodeValue, "Text nodes are different");
			return;
		}

		assert.equal(aNode.nodeType, 1, "Nodes should be elements");

		assert.equal(aNode.tagName.toLowerCase(), eNode.tagName.toLowerCase(), "Elements should have same tag.");

		if (debug) {
			console.log(indent + aNode.tagName);
			indent += "  ";
		}

		Array.prototype.slice.call(eNode.attributes).forEach(function (item) {
			if (item.name === "style" && eNode.tagName === "svg") {
				return;
			}
			var aValue = eNode.getAttribute(item.name);
			var eValue = item.value;
			if (item.name === "d" && eNode.tagName === "path") {
				aValue = aValue.replace(/\.0+([^\d]|$)/g, "$1");
				eValue = eValue.replace(/\.0+([^\d]|$)/g, "$1");
			} else if (item.name === "TEXT-DECORATION" && (eNode.tagName === "text" || eNode.tagName === "textPath") &&
				aValue === null) {
				aValue = "none";
			} else if (eNode.tagName === "image" && item.name === "xlink:href") {
				aValue = normalizeImage(aValue);
				eValue = normalizeImage(eValue);
			}
			assert.equal(aValue, eValue, "Attribute " + item.name + " of " + aNode.tagName + " element differs");

			if (debug) {
				console.log(indent + item.name + " = " + aValue);
			}
		});

		assert.equal(aNode.childElementCount, eNode.childElementCount, "Different number of children");

		var aChild = aNode.firstChild, eChild = eNode.firstChild;
		while (aChild || eChild) {
			compareSVGRecursive(aChild, eChild, indent);
			aChild = aChild.nextSibling;
			eChild = eChild.nextSibling;
		}
	}

	function dumpCanvas(surface) {
		return canvasRecorder.getRecording(surface);
	}

	function compareCalls(a, e) {
		assert.equal(a.length, e.length, "Canvas recording lengths differ");
		for (var i = 0; i < e.length; i++) {
			if (typeof e[i] === "number") {
				assert.isTrue(Math.abs(a[i] - e[i]) <= 0.0001, "Canvas coords at position " + i + " differ");
			} else if (typeof e[i] === "string" && i > 0 && e[i - 1] === canvasRecorder.abbreviations.drawImage) {
				assert.equal(normalizeImage(a[i]), normalizeImage(e[i]), "Images at position " + i + " differ");
			} else if (Array.isArray(a[i]) && Array.isArray(e[i])) {
				compareCalls(a[i], e[i]);
			} else {
				assert.deepEqual(a[i], e[i], "Canvas calls at position " + i + " differ");
			}
		}
	}

	function compareCanvas(surface, expected) {
		var actual = dumpCanvas(surface);
		if (actual !== expected) {
			compareCalls(JSON.parse(actual), JSON.parse(expected));
		}
	}

	var renderers = {
		"svg": { label: "SVG", module: svg, dump: dumpSVG, compare: compareSVG },
		"canvas": { label: "Canvas", module: canvas, dump: dumpCanvas, compare: compareCanvas }
	};
	var renderer;

	var surfaceRow, surfaceCols = {};

	var visual = intern.config.gfxVisualTest;

	var surfacesOnScreen = [];

	var createSurface = function (width, height, r, key, title) {
		var node = document.createElement("div");
		r = renderer || r || "svg";
		if (visual) {
			var tr, td;
			if (!surfaceRow) {
				var table = document.createElement("table");
				document.body.appendChild(table);
				surfaceRow = document.createElement("tr");
				table.appendChild(surfaceRow);
			}
			var columnName = r + (key ? (" - " + key) : "");
			var c = surfaceCols[columnName];
			if (!c) {
				td = document.createElement("td");
				surfaceRow.appendChild(td);
				c = document.createElement("table");
				td.appendChild(c);
				surfaceCols[columnName] = c;
				tr = document.createElement("tr");
				c.appendChild(tr);
				var th = document.createElement("th");
				th.innerHTML = columnName;
				th.style.fontFamily = "arial";
				th.style.height = "30px";
				tr.appendChild(th);
			}
			_createSurfaceCell(c, node, width, height);
			if (title) {
				tr = document.createElement("tr");
				c.appendChild(tr);
				td = document.createElement("td");
				td.innerHTML = title;
				td.style.fontFamily = "arial";
				td.style.textAlign = "center";
				td.style.height = "30px";
				td.style.verticalAlign = "top";
				tr.appendChild(td);
			}
		} else {
			document.body.appendChild(node);
		}
		var surface = new renderers[r].module.Surface(node, width, height);
		if (visual) {
			surfacesOnScreen.push(surface);
		}
		return surface;
	};

	var _createSurfaceCell = function (c, node, width, height) {
		var tr = document.createElement("tr");
		c.appendChild(tr);
		var td = document.createElement("td");
		td.style.width = width + "px";
		td.style.height = height + "px";
		tr.appendChild(td);
		node.style.border = "#c0c0c0 1px solid";
		td.appendChild(node);
	};

	var destroySurface = function (surface) {
		if (!visual || surface.children.length === 0) {
			var p = surface._parent;
			var pp = p.parentNode.parentNode;
			surface.destroy();
			p.parentNode.removeChild(p);
			if (visual && pp.parentNode.tagName === "TR") {
				pp.parentNode.removeChild(pp);
			}
			surfacesOnScreen.splice(surfacesOnScreen.indexOf(surface), 1);
		}
	};

	var clear = function (surface) {
		if (visual) {
			var c = surface._parent.parentNode.parentNode.parentNode;
			var r = renderer || "svg";
			var node = document.createElement("div");
			var dim = surface.getDimensions();
			_createSurfaceCell(c, node, dim.width, dim.height);
			surface = new renderers[r].module.Surface(node, dim.width, dim.height);
			surfacesOnScreen.push(surface);
		} else {
			surface.clear();
		}
		return surface;
	};

	var titleHeading, emptyMessage;

	function addTitle(title) {
		if (!visual) {
			return;
		}
		if (!titleHeading) {
			titleHeading = document.createElement("div");
			var h = document.createElement("h2");
			titleHeading.appendChild(h);
			h.innerHTML = title;
			titleHeading.style.fontFamily = "arial";
			document.body.appendChild(titleHeading);
		} else {
			titleHeading.firstChild.innerHTML += " / " + title;
		}
	}

	function checkEmpty() {
		if (!visual) {
			return;
		}
		var empty = true;
		surfacesOnScreen.forEach(function (s) {
			if (s.children.length) {
				s.children.forEach(function (child) {
					if (!("children" in child) || child.children.length) {
						empty = false;
					}
				});
			}
		});
		if (empty) {
			if (!emptyMessage) {
				var p = document.createElement("p");
				emptyMessage = p;
				p.innerHTML =
					"This test does not display anything so interesting, check browser console (F12) for messages.";
				p.style.fontFamily = "arial";
				p.style.backgroundColor = "#e0e0e0";
				p.style.padding = "10px";
				p.style.borderRadius = "5px";
				titleHeading.appendChild(p);
			}
		} else if (emptyMessage) {
			titleHeading.removeChild(emptyMessage);
			emptyMessage = null;
		}
	}

	var tu = {
		registerSuite: function (suite) {
			addTitle(suite.name);
			for (var rid in renderers) {
				if (renderers.hasOwnProperty(rid)) {
					var r = renderers[rid];
					var s = {};
					for (var p in suite) {
						if (suite.hasOwnProperty(p)) {
							s[p] = suite[p];
						}
					}
					s.name += " [renderer=" + r.label + "]";

					(function () {
						var id = rid;
						var setup = s.setup;
						s.setup = function () {
							tu._savedRenderer = tu.renderer;
							renderer = tu.renderer = id;
							if (setup) {
								setup();
							}
						};
						var teardown = s.teardown;
						s.teardown = function () {
							renderer = tu.renderer = tu._savedRenderer;
							if (teardown) {
								teardown();
							}
							checkEmpty();
						};
					})();
					registerSuite(s);
				}
			}
		},
		compare: function (surface, expected) {

			var r = tu.renderer || "svg", p = r;
			if (r === "canvas" && expected[p + "-nativedash"]) {
				p += canvasBase.hasNativeDash ? "-nativedash" : "-nonativedash";
			}
			expected = expected[p];

			var check = tu.check;

			if (!expected) {
				console.log("========== Copy expected " + renderers[r].label + " output from here: ==========");
				console.log(renderers[r].dump(surface));
				console.log("========================================================");
				check = true;
			}

			if (check) {
				if (surface.rawNode.scrollIntoView) {
					surface.rawNode.scrollIntoView();
				}
				if (surface._render) {
					surface._render();
				}
				alert("Drawing OK?");
			}

			assert.ok(expected, "Falsy expected output: copy from above to test source.");

			renderers[r].compare(surface, expected);
		},

		compareWithImages: function (test, surface, expected, timeout) {
			var d = test.async(timeout || 60000);
			if (tu.renderer === "canvas" && surface.pendingImageCount > 0) {
				var t = setInterval(function () {
					if (surface.pendingImageCount === 0) {
						clearInterval(t);
						d.resolve();
					}
				}, 1000);
				surface.onImagesLoaded = d.callback(function () {
					clearInterval(t);
					tu.compare(surface, expected);
				});
			} else {
				setTimeout(d.callback(function () {
					tu.compare(surface, expected);
				}));
			}
			return d;
		},

		createSurface: createSurface,
		destroySurface: destroySurface,
		clear: clear,
		addTitle: addTitle,
		checkEmpty: checkEmpty,

		getRendererModule: function () {
			return renderers[tu.renderer].module;
		}
	};

	return tu;
});
