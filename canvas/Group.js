define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/_GroupBase",
	"./Container",
	"./Creator"
], function(declare, CanvasShape, GroupBase, CanvasContainer, CanvasCreator){
	return declare([CanvasShape, GroupBase, CanvasContainer, CanvasCreator], {
		// summary:
		//		a group shape (Canvas), which can be used
		//		to logically group shapes (e.g, to propagate matricies)
		_render: function(/* Object */ ctx){
			// summary:
			//		render the group
			ctx.save();
			this._renderTransform(ctx);
			this._renderClip(ctx);
			for(var i = 0; i < this.children.length; ++i){
				this.children[i]._render(ctx);
			}
			ctx.restore();
		}
	});
});
