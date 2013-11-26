define([
	"./canvas/_base",
	"./canvas/Shape",
	"./canvas/Container",
	"./canvas/Surface",
	"./canvas/Group",
	"./canvas/Rect",
	"./canvas/Ellipse",
	"./canvas/Circle",
	"./canvas/Line",
	"./canvas/Polyline",
	"./canvas/Image",
	"./canvas/Path",
	"./canvas/Text",
	"./canvas/TextPath",
	"./canvas/Creator"
], function(canvas, Shape, Container, Surface, Group, Rect, Ellipse, Circle, Line, Polyline, Image, Path, Text, TextPath, Creator){
	return {
		// summary:
		//		This the graphics rendering bridge for W3C Canvas compliant browsers.
		//		Since Canvas is an immediate mode graphics api, with no object graph or
		//		eventing capabilities, use of this module alone will only add in drawing support.
		//		(An experimental canvasWithEvents module, which extends this module with additional support
		//		for handling events, is available separately in the gfx-experimental project.)
		id: "canvas",
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
