define([
    "doh/runner",
    "require"
], function(doh, require){
    doh.registerUrl("GFX: Primitives", require.toUrl("./gfx_primitives.html"), 3600000);
    doh.registerUrl("GFX: Fill", require.toUrl("./gfx_fill.html"), 3600000);
    doh.registerUrl("GFX: Complex Scenes", require.toUrl("./gfx_scenes.html"), 3600000);
});
