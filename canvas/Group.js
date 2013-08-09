define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/Group",
	"./Container",
	"./Creator"
], function(declare, canvasShape, baseGroup, canvasContainer, canvasCreator){
	return declare([canvasShape, baseGroup, canvasContainer, canvasCreator], {
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
