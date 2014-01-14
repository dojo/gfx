define([
	"../_base",
	"dcl/dcl",
	"./_ShapeBase"
], function(g, dcl, Shape){
	var defaultShape = {
		// summary:
		//		Defines the default Image prototype.

		// type: String
		//		Specifies this object is an image, value 'image'.
		type: "image",

			// x: Number
			//		The X coordinate of the image's position, default value 0.
			x: 0,

			// y: Number
			//		The Y coordinate of the image's position, default value 0.
			y: 0,

			// width: Number
			//		The width of the image, default value 0.
			width: 0,

			// height: Number
			//		The height of the image, default value 0.
			height: 0,

			// src: String
			//		The src url of the image, defaults to empty string.
			src: ""
	};
	var Image = dcl(Shape, {
		// summary:
		//		a generic image (do not instantiate it directly)
		shape: defaultShape,
		getBoundingBox: function(){
			// summary:
			//		returns the bounding box (its shape in this case)
			return this.shape;	// gfx.Rectangle
		},
		_setStrokeAttr: function(){
			// summary:
			//		ignore setting a stroke style
			return this;	// self
		},
		_setFillAttr: function(){
			// summary:
			//		ignore setting a fill style
			return this;	// self
		}
	});
	Image.defaultShape = defaultShape;
	return Image;
});
