define([
	"dojo/_base/declare",
	"./Shape",
	"../shape/Group",
	"./Container",
	"./Creator"
], function(declare, SvgShape, BaseGroup, SvgContainer, SvgCreator){

		var Group = declare([SvgShape, BaseGroup, SvgContainer, SvgCreator], {
			// summary:
			//		a group shape (SVG), which can be used
			//		to logically group shapes (e.g, to propagate matricies)
			setRawNode: function(rawNode){
				// summary:
				//		sets a raw SVG node to be used by this shape
				// rawNode: Node
				//		an SVG node
				this.rawNode = rawNode;
				// Bind GFX object with SVG node for ease of retrieval - that is to
				// save code/performance to keep this association elsewhere
				this.rawNode.__gfxObject__ = this;
			}
		});
		Group.nodeType = "g";

		return Group;
	});
