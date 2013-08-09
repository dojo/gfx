GFX
===

This repository contains a prototype implementation of GFX based on Dojo 2.0.

GFX is a simple portable 2D JavaScript graphics library.

Note: This is work-in-progress and will be subject to many changes.

Credits
-------
	Eugene Lazutkin (eugene.lazutkin@gmail.com)
	Kun Xi (bookstack@gmail.com)
	Chris Mitchell (ccmitchellusa@gmail.com) HTML Canvas
	Yang Li () SVGWeb integration
	Patrick Ruzand (pruzand@gmail.com)

Licensing
---------

This project is distributed by the Dojo Foundation and licensed under the Dojo dual license BSD/AFLv2 license. All contributions require a Dojo Foundation CLA.

Dependencies and Installation
-----------------------------

The GFX library code uses the Dojo core and also (for now) some Dojox legacy modules.
In addition, the tests and demos use Dijit widgets and the DOH framework.
So the directory structure should look like the following:

    parentDir
        dijit                    Dojo widgets (for tests/demos)
        dojo                     Dojo core
        dojox                    (see below)
        gfx                      this repository
        util
            doh                  DOH test framework (for tests/demos)

Uses of legacy DojoX Modules
----------------------------

The GFX library code has the following dependencies:
- gfx/_gfxBidiSupport requires dojox/string/BidiEngine,
- gfx/VectorText (likely to be removed in 2.0) requires dojox/html/metrics and dojox/xml/DomParser.

So, applications not using these 2 modules are already completely independent of legacy dojox code.

In addition, some performance tests require dojox/charting (and, indirectly, the legacy dojox/gfx) to display results.

Current Status
--------------

The current code is a copy of the Dojo 1.9 code, with the following changes:
- The VML, and Silverlight renderers have been removed, as well as the SVGWeb support in the SVG renderer.
- The gfx namespace is changed to the toplevel gfx namespace.
- All demos and tests have been converted to AMD loader syntax and HTML5 compliant attributes (data-dojo-*).
- Each shape class is now in its own AMD module in the shape/ directory, for example, gfx/shape/Shape.js, gfx/shape/Rect.js etc.
- Each renderer has its own subdirectory containing the shape subclasses, for example gfx/svg/Shape.js, gfx/svg/Rect.js, etc.
- The shape.js, svg.js, canvas.js and canvasWithEvents.js modules are still here for compatibility, now the simply require all the corresponding shape classes.
