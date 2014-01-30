define(["dcl/dcl", "../../_bidi"], function(dcl, bidi){

	return dcl(null, {
		// summary:
		//		Overrides some of gfx.Text properties, and adds some
		//		for bidi support.

		// textDir: String
		//		Used for displaying bidi scripts in right layout.
		//		Defines the base direction of text that displayed, can have 3 values:
		//
		//		1. "ltr" - base direction is left to right.
		//		2. "rtl" - base direction is right to left.
		//		3. "auto" - base direction is contextual (defined by first strong character).
		textDir: "",

		formatText: function (/*String*/ text, /*String*/ textDir){
			// summary:
			//		Applies the right transform on text, according to renderer.
			// text:
			//		the string for manipulation, by default return value.
			// textDir:
			//		Text direction.
			//		Can be:
			//
			//		1. "ltr" - for left to right layout.
			//		2. "rtl" - for right to left layout
			//		3. "auto" - for contextual layout: the first strong letter decides the direction.
			// description:
			//		Finds the right transformation that should be applied on the text, according to renderer.
			//		Was tested in:
			//
			//		Renderers (browser for testing):
			//
			//		- canvas (FF, Chrome, Safari),
			//		- svg (FF, Chrome, Safari, Opera),
			//
			//		Browsers [browser version that was tested]:
			//
			//		- IE [6,7,8], FF [3.6],
			//		- Chrome (latest for March 2011),
			//		- Safari [5.0.3],
			//		- Opera [11.01].

			if(textDir && text && text.length > 1){
				var targetDir = textDir;

				if(targetDir == "auto"){
					//is auto by default
					targetDir = bidi.bidiEngine.checkContextual(text);
				}

				return this.makeBidiText(text, targetDir);
			}
			return text;
		},

		makeBidiText: function(text, targetDir){
			// summary:
			//		Builds a bidi string from an original string by adding the correct bidi markers.
			//		This may be renderer-dependent so this method should be redefined by renderers.
			return text;
		},

		bidiPreprocess: function(newShape){
			return newShape;
		},

		_setParent: dcl.superCall(function(sup){
			return function(parent){
				sup.apply(this, arguments);
				this.shape = bidi.textDirPreprocess.call(parent, this._get("shape"));
			};
		})
	});
});
