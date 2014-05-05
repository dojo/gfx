define([
	"dcl/dcl", "./Shape", "./Container", "./Creator", "../_base"
], function (dcl, SvgShape, SvgContainer, SvgCreator, gfxBase) {

	var defaultShape = {
		// summary:
		//		Defines the default Mask prototype.

		// type: String
		//		The type of the Mask shape (always "mask").
		type: "mask",

		// id: String
		//		The mask identifier. If none is provided, a generated id will be used.
		id: null,

		// x: Number
		//		The x coordinate of the top-left corner of the mask
		x: 0,

		// y: Number
		//		The y coordinate of the top-left corner of the mask
		y: 0,

		// width: Number
		//		The width of the mask. Defaults to 1 which is 100% of the bounding
		//		box width of the object applying the mask.
		width: 1,

		// height: Number
		//		The height of the mask. Defaults to 1 which is 100% of the bounding
		//		box height of the object applying the mask.
		height: 1,

		// maskUnits: String
		//		The coordinate system of the mask's `x`, `y`, `width`, and `height` properties.
		//		The default is "objectBoundingBox" where coordinates are fractions of the bounding box
		//		of the shape referencing the mask.
		maskUnits: "objectBoundingBox",

		// maskContentUnits: String
		//		The coordinate system for the mask's children. The default is "userSpaceOnUse"
		//		(i.e., the coordinate system of the shape referencing the mask).
		maskContentUnits: "userSpaceOnUse"
	};

	var Mask = dcl([SvgShape, SvgContainer, SvgCreator], {
		// summary:
		//		An SVG mask object
		// description:
		//		This object represents an SVG mask. Much like `dojox/gfx.Group`,
		//		a Mask's geometry is defined by its children.
		shape: defaultShape,

		setRawNode: function (rawNode) {
			this.rawNode = rawNode;
		},

		_setShapeAttr: dcl.superCall(function (sup) {
			return function (shape) {
				if (!shape.id) {
					var newShape = { id: gfxBase._getUniqueId() };
					for (var p in shape) {
						if (shape.hasOwnProperty(p)) {
							newShape[p] = shape[p];
						}
					}
					shape = newShape;
				}
				sup.apply(this, arguments);
			};
		})
	});

	Mask.nodeType = "mask";
	Mask.defaultShape = defaultShape;

	return Mask;
});
