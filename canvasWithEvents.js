define([
	"./canvas",
	"./canvas/_base",
	"./canvasWithEvents/Shape",
	"./canvas/Container",
	"./canvasWithEvents/Surface",
	"./canvasWithEvents/Group",
	"./canvasWithEvents/Rect",
	"./canvasWithEvents/Ellipse",
	"./canvasWithEvents/Circle",
	"./canvasWithEvents/Line",
	"./canvasWithEvents/Polyline",
	"./canvasWithEvents/Image",
	"./canvasWithEvents/Path",
	"./canvasWithEvents/Text",
	"./canvasWithEvents/TextPath",
	"./canvasWithEvents/Creator"
], function(canvasRenderer, canvas, Shape, Container, Surface, Group, Rect, Ellipse, Circle, Line, Polyline, Image, Path, Text, TextPath, Creator){
	return {
		// summary:
		//		This the graphics rendering bridge for W3C Canvas compliant browsers.
		//		Since Canvas is an immediate mode graphics api, with no object graph or
		//		eventing capabilities, use of this module alone will only add in drawing support.
		//		The additional module, canvasWithEvents extends this module with additional support
		//		for handling events on Canvas.  By default, the support for events is now included
		//		however, if only drawing capabilities are needed, canvas event module can be disabled
		//		using the dojoConfig option, canvasEvents:true|false.
		//		The id of the Canvas renderer is 'canvas'.  This id can be used when switch Dojo's
		//		graphics context between renderer implementations.  See gfx/_base.switchRenderer
		//		API.
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
		},
		fixTarget: canvas.fixTarget
	};
});
