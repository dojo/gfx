define(["./_base", "./renderer!"],
  function(gfx, renderer){
	// module:
	//		gfx
	// summary:
	//		This the root of the Dojo Graphics package
	gfx.switchTo(renderer);
	return gfx;
});
