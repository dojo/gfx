define([
	"dojo/_base/declare",
	"../_base",
	"./_base",
	"./Shape",
	"../shape/Image"
], function(declare, g, svg, SvgShape, BaseImage){
	var Image = declare([SvgShape, BaseImage], {
		// summary:
		//		an image shape (SVG)
		setShape: function(newShape){
			// summary:
			//		sets an image shape object (SVG)
			// newShape: Object
			//		an image shape object
			this.shape = g.makeParameters(this.shape, newShape);
			this.bbox = null;
			var rawNode = this.rawNode;
			for(var i in this.shape){
				if(i != "type" && i != "src"){
					rawNode.setAttribute(i, this.shape[i]);
				}
			}
			rawNode.setAttribute("preserveAspectRatio", "none");
			svg._setAttributeNS(rawNode, svg.xmlns.xlink, "xlink:href", this.shape.src);
			// Bind GFX object with SVG node for ease of retrieval - that is to
			// save code/performance to keep this association elsewhere
			rawNode.__gfxObject__ = this;
			return this;	// self
		}
	});
	Image.nodeType = "image";
	return Image;
});
