define(["dojo/_base/lang", "./_base", "./renderer!"],
  function(lang, gfx, renderer){
	// module:
	//		gfx
	// summary:
	//		This the root of the Dojo Graphics package
	gfx.switchTo(renderer);
	return gfx;
});
