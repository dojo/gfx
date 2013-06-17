define([
    "doh/runner",
    "require"
], function(doh, require){
    doh.registerUrl("gfx.tests._gfxBidiSupport.test_SurfaceGroup", require.toUrl("./test_SurfaceGroup.html"));
    doh.registerUrl("gfx.tests._gfxBidiSupport.canvas.test_SurfaceGroupCanvas", require.toUrl("./canvas/test_SurfaceGroupCanvas.html"));
});
