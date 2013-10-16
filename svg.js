define([
	"./svg/_base",
	"./svg/Shape",
	"./svg/Container",
	"./svg/Surface",
	"./svg/Group",
	"./svg/Rect",
	"./svg/Ellipse",
	"./svg/Circle",
	"./svg/Line",
	"./svg/Polyline",
	"./svg/Image",
	"./svg/Path",
	"./svg/Text",
	"./svg/TextPath",
	"./svg/Creator"
], function(svg, Shape, Container, Surface, Group, Rect, Ellipse, Circle, Line, Polyline, Image, Path, Text, TextPath, Creator){
	return {
		// summary:
		//		This the graphics rendering bridge for browsers compliant with W3C SVG1.0.
		//		This is the preferred renderer to use for interactive and accessible graphics.
		Shape: Shape,
		Container: Container,
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
		Creator: Creator,
		createSurface: function(node, width, height){
			return new Surface(node, width, height);
		}
	};
});
