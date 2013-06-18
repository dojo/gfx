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
        dojox
            string
                BidiEngine.js    (for Bidi support)
        gfx                      this repository
        util
            doh                  DOH test framework (for tests/demos)

Current Status
--------------

The initial code is a copy of the Dojo 1.9 code, with the following changes:
- The VML, and Silverlight renderers have been removed, as well as the SVGWeb support in the SVG renderer.
- The gfx namespace is changed to the toplevel gfx namespace.
