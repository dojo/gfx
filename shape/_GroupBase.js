define(["dojo/_base/declare", "./_ShapeBase", "./_ContainerBase"],
	function(declare, Shape, Container){
		return declare([Shape, Container], {
			// summary:
			//		The base class for a group shape, which can be used
			//		to logically group shapes (e.g, to propagate matricies)

			destroy: function(){
				// summary:
				//		Releases all internal resources owned by this shape. Once this method has been called,
				//		the instance is considered disposed and should not be used anymore.
				this.clear(true);
				// avoid this.inherited
				this.inherited(arguments);
			}
		});
	});
