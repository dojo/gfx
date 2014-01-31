define(["require", "dcl/dcl", "../../utils", "../../_bidi"], function(require, dcl, gfxUtils, bidi){

	var classesRequired, Container, Text, TextPath;

	function setTextDir(/*Object*/ obj, /*String*/ newTextDir){
		if(!classesRequired){
			try { Container = require("../_ContainerBase"); }catch(err){}
			try { Text = require("../_TextBase"); }catch(err){}
			try { TextPath = require("../_TextPathBase"); }catch(err){}
			classesRequired = true;
		}
		var tDir = bidi.validateTextDir(newTextDir);
		if (tDir){
			gfxUtils.forEach(obj,function(e){
				if(dcl.isInstanceOf(e, Container)){
					e._set("textDir", tDir);
				}
				if(dcl.isInstanceOf(e, Text)){
					e.shape = {textDir: tDir};
				}
				if(dcl.isInstanceOf(e, TextPath)){
					e.text = {textDir: tDir};
				}
			}, obj);
		}
		return obj;
	}

	return dcl(null, {
		// textDir: String
		//		Will be used as default for Text/TextPath/Group objects that created by this surface
		//		and textDir wasn't directly specified for them, though the bidi support was loaded.
		//		Can be set in two ways:
		//
		//		1. When the surface is created and textDir value passed to it as fourth
		//		parameter.
		//		2. Using the setTextDir(String) function, when this function is used the value
		//		of textDir propagates to all of it's children and the children of children (for Groups) etc.
		textDir: "",

		_setTextDirAttr: function(/*String*/newTextDir){
			// summary:
			//		Used for propagation and change of textDir.
			//		newTextDir will be forced as textDir for all of it's children (Group/Text/TextPath).
			setTextDir(this, newTextDir);
		}
	});
});
