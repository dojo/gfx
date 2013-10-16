define([
	"dojo/_base/declare",
	"../_base",
	"./Shape",
	"../shape/Rect"
], function(declare, g, SvgShape, BaseRect){
	var Rect = declare([SvgShape, BaseRect], {
		// summary:
		//		a rectangle shape (SVG)
		setShape: function(newShape){
			// summary:
			//		sets a rectangle shape object (SVG)
			// newShape: Object
			//		a rectangle shape object
			this.shape = g.makeParameters(this.shape, newShape);
			this.bbox = null;
			for(var i in this.shape){
				if(i != "type" && i != "r"){
					this.rawNode.setAttribute(i, this.shape[i]);
				}
			}
			if(this.shape.r != null){
				this.rawNode.setAttribute("ry", this.shape.r);
				this.rawNode.setAttribute("rx", this.shape.r);
			}
			return this;	// self
		}
	});

	Rect.nodeType = "rect";

	return Rect;
});
