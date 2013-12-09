define([
	"dcl/dcl",
	"./Shape",
	"../shape/_PathBase"
], function(dcl, SvgShape, PathBase){
	var Path = dcl([SvgShape, PathBase], {
		// summary:
		//		a path shape (SVG)
		_updateWithSegment: dcl.superCall(function(sup){
			return function(segment){
				// summary:
				//		updates the bounding box of path with new segment
				// segment: Object
				//		a segment
				sup.apply(this, arguments);
				if(typeof(this.shape.path) == "string"){
					this.rawNode.setAttribute("d", this.shape.path);
				}
			}
		}),
		setShape: dcl.superCall(function(sup){
			return function(newShape){
				// summary:
				//		forms a path using a shape (SVG)
				// newShape: Object
				//		an SVG path string or a path object (see gfx.defaultPath)
				sup.apply(this, arguments);
				if(this.shape.path){
					this.rawNode.setAttribute("d", this.shape.path);
				}else{
					this.rawNode.removeAttribute("d");
				}
				return this;	// self
			}
		})
	});
	Path.nodeType = "path";
	return Path;
});
