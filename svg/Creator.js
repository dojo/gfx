define([
	"dojo/_base/declare",
	"../shape/Creator",
	"./_base"
], function(declare, baseCreator, svg){
	return declare([baseCreator], {
		// summary:
		//		SVG shape creators
		createObject: function(shapeType, rawShape){
			// summary:
			//		creates an instance of the passed shapeType class
			// shapeType: Function
			//		a class constructor to create an instance of
			// rawShape: Object
			//		properties to be passed in to the classes "setShape" method
			if(!this.rawNode){
				return null;
			}
			var shape = new shapeType(),
				node = svg._createElementNS(svg.xmlns.svg, shapeType.nodeType);

			shape.setRawNode(node);
			shape.setShape(rawShape);
			// rawNode.appendChild() will be done inside this.add(shape) below
			this.add(shape);
			return shape;	// gfx/shape.Shape
		}
	});
});
