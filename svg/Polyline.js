define([
	"dcl/dcl",
	"../_base",
	"./Shape",
	"../shape/_PolylineBase"
], function(dcl, g, SvgShape, PolylineBase){
	var Polyline = dcl([SvgShape, PolylineBase], {
		// summary:
		//		a polyline shape (SVG)
		_setShapeAttr: function(points, closed){
			// summary:
			//		sets a polyline/polygon shape object (SVG)
			// points: Object|Array
			//		a polyline/polygon shape object, or an array of points
			if(points && points instanceof Array){
				this._set("shape", g.makeParameters(this.shape, { points: points }));
				if(closed && this.shape.points.length){
					this.shape.points.push(this.shape.points[0]);
				}
			}else{
				this._set("shape", g.makeParameters(this.shape, points));
			}
			this.bbox = null;
			this._normalizePoints();
			var attr = [], p = this.shape.points;
			for(var i = 0; i < p.length; ++i){
				attr.push(p[i].x.toFixed(8), p[i].y.toFixed(8));
			}
			this.rawNode.setAttribute("points", attr.join(" "));
			return this;	// self
		}
	});
	Polyline.nodeType = "polyline";
	return Polyline;
});
