define(["dcl/dcl", "./_ShapeBase", "./_ContainerBase", "dojo/has", "dojo/has!dojo-bidi?./bidi/_Group"],
	function(dcl, Shape, Container, has, BidiGroup){
		var Group = dcl([Shape, Container], {
			// summary:
			//		The base class for a group shape, which can be used
			//		to logically group shapes (e.g, to propagate matricies)

			destroy: dcl.superCall(function(sup){
				return function(){
					// summary:
					//		Releases all internal resources owned by this shape. Once this method has been called,
					//		the instance is considered disposed and should not be used anymore.
					this.clear(true);
					sup.apply(this, arguments);
				};
			})
		});
		return has("dojo-bidi")?dcl([Group, BidiGroup], {}):Group;
	});
