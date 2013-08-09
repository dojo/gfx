define([
	"dojo/_base/declare",
	"../shape/Creator"
], function(declare, baseCreator){
	return declare([baseCreator], {
		// summary:
		//		Canvas shape creators
		createObject: function(shapeType, rawShape){
			// summary:
			//		creates an instance of the passed shapeType class
			// shapeType: Function
			//		a class constructor to create an instance of
			// rawShape: Object
			//		properties to be passed in to the classes "setShape" method
			// overrideSize: Boolean
			//		set the size explicitly, if true
			var shape = new shapeType();
			shape.surface = this.surface;
			shape.setShape(rawShape);
			this.add(shape);
			return shape;	// gfx/shape.Shape
		}
	});
});
