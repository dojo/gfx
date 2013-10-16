define([
	"./shape/_ShapeBase",
	"./shape/_ContainerBase",
	"./shape/_SurfaceBase",
	"./shape/_GroupBase",
	"./shape/_RectBase",
	"./shape/_EllipseBase",
	"./shape/_CircleBase",
	"./shape/_LineBase",
	"./shape/_PolylineBase",
	"./shape/_ImageBase",
	"./shape/_PathBase",
	"./shape/_TextBase",
	"./shape/_TextPathBase",
	"./shape/_CreatorBase"
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
