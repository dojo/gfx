define([
	"./shape/Shape",
	"./shape/Container",
	"./shape/Surface",
	"./shape/Group",
	"./shape/Rect",
	"./shape/Ellipse",
	"./shape/Circle",
	"./shape/Line",
	"./shape/Polyline",
	"./shape/Image",
	"./shape/Path",
	"./shape/Text",
	"./shape/TextPath",
	"./shape/Creator"
], function(Shape, Container, Surface, Group, Rect, Ellipse, Circle, Line, Polyline, Image, Path, Text, TextPath, Creator){
	return {
		// summary:
		//		This module contains the core graphics Shape API.
		//		Different graphics renderer implementation modules (svg, canvas) extend this
		//		basic api to provide renderer-specific implementations for each shape.
		Shape: Shape,
		Surface: Surface,
		Group: Group,
		Rect: Rect,
		Ellipse: Ellipse,
		Circle: Circle,
		Line: Line,
		Polyline: Polyline,
		Image: Image,
		Path: Path,
		Text: Text,
		TextPath: TextPath,
		Container: Container.prototype,
		Creator: Creator.prototype
	};
});
