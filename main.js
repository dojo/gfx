define(["dojo/_base/lang", "./_base", "./renderer!"],
  function(lang, gfxBase, renderer){
	// module:
	//		gfx
	// summary:
	//		This the root of the Dojo Graphics package
	gfxBase.switchTo(renderer);
	return gfxBase;
});
