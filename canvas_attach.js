define(["dojo/_base/lang", "dojo/_base/kernel","gfx/canvas"], function(lang,kernel,canvas){
	lang.getObject("gfx.canvas_attach", true);
	kernel.experimental("gfx.canvas_attach");

	// not implemented
	canvas.attachSurface = canvas.attachNode = function(){
		return null;	// for now
	};

	return canvas;
});
