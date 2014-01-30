define(["dojo/_base/lang", "dojo/_base/array", "../dojox/string/BidiEngine"], function(lang, arr, BidiEngine){

	function validateTextDir(textDir){
		var validValues = ["ltr", "rtl", "auto"];
		if(textDir){
			textDir = textDir.toLowerCase();
			if(arr.indexOf(validValues, textDir) < 0){
				return null;
			}
		}
		return textDir;
	}

	return {
		bidi_const: {
			LRM: '\u200E',
			LRE: '\u202A',
			PDF: '\u202C',
			RLM: '\u200f',
			RLE: '\u202B'
		},

		// the object that performs text transformations.
		bidiEngine: new BidiEngine(),

		bidiPreprocess: function(newText){
			if(newText){
				if(newText.textDir){
					newText.textDir = validateTextDir(newText.textDir);
				}
				if(newText.text && (newText.text instanceof Array)){
					newText.text = newText.text.join(",");
				}
			}
			if(newText && (newText.text != undefined || newText.textDir) && (this.textDir != newText.textDir || newText.text != this.origText)){
				// store the original text.
				this.origText = (newText.text != undefined) ? newText.text : this.origText;
				if(newText.textDir){
					this.textDir = newText.textDir;
				}
				newText.text = this.formatText(this.origText, this.textDir);
			}
			return this.bidiPreprocess(newText);
		},

		restoreText: function(origObj){
			var obj = lang.clone(origObj);
			if(obj && this.origText){
				obj.text = this.origText;
			}
			return obj;
		},

		textDirPreprocess: function(text){
			// inherit from surface / group  if textDir is defined there
			if(text){
				var textDir = text.textDir ? validateTextDir(text.textDir) : this.textDir;
				if(textDir){
					text.textDir = textDir;
				}
			}
			return text;
		},

		validateTextDir: validateTextDir
	};
});
