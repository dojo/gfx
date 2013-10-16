define([
	"dojo/_base/lang",
	"dojo/_base/array",
	"dojo/_base/declare",
	"./_base",
	"./Shape",
	"../shape/_PathBase",
	"../arc"
], function(lang, arr, declare, canvas, CanvasShape, PathBase, ga){

	var hasNativeDash = canvas.hasNativeDash;

	var pathRenderers = {
		M: "_moveToA", m: "_moveToR",
		L: "_lineToA", l: "_lineToR",
		H: "_hLineToA", h: "_hLineToR",
		V: "_vLineToA", v: "_vLineToR",
		C: "_curveToA", c: "_curveToR",
		S: "_smoothCurveToA", s: "_smoothCurveToR",
		Q: "_qCurveToA", q: "_qCurveToR",
		T: "_qSmoothCurveToA", t: "_qSmoothCurveToR",
		A: "_arcTo", a: "_arcTo",
		Z: "_closePath", z: "_closePath"
	};

	function toDashedCurveTo(/*Array||CanvasRenderingContext2D*/ctx, /*shape.Path*/shape, /*Number[]*/points, /*Object*/prevResidue){
		// summary:
		//		Builds a set of bezier (cubic || quadratic)curveTo' canvas instructions that represents a dashed stroke of the specified bezier geometry.

		var pts = [shape.last.x, shape.last.y].concat(points),
			quadratic = points.length === 4, ctx2d = !(ctx instanceof Array),
			api = quadratic ? "quadraticCurveTo" : "bezierCurveTo",
			curves = [];
		var residue = splitToDashedBezier(pts, shape.canvasDash, curves, prevResidue);
		for(var c=0; c<curves.length;++c){
			var curve = curves[c];
			if(ctx2d){
				ctx.moveTo(curve[0], curve[1]);
				ctx[api].apply(ctx, curve.slice(2));
			}else{
				ctx.push("moveTo", [curve[0], curve[1]]);
				ctx.push(api, curve.slice(2));
			}
		}
		return residue;
	}

	return declare([CanvasShape, PathBase], {
		// summary:
		//		a path shape (Canvas)
		constructor: function(){
			this.lastControl = {};
		},
		setShape: function(){
			this.canvasPath = [];
			this._dashedPath= [];
			return this.inherited(arguments);
		},
		setStroke:function(){
			this.inherited(arguments);
			if(!hasNativeDash){
				this.segmented = false;
				this._confirmSegmented();
			}
			return this;
		},
		_setPath: function(){
			this._dashResidue = null;
			this.inherited(arguments);
		},
		_updateWithSegment: function(segment){
			var last = lang.clone(this.last);
			this[pathRenderers[segment.action]](this.canvasPath, segment.action, segment.args, this._needsDash ? this._dashedPath : null);
			this.last = last;
			this.inherited(arguments);
		},
		_renderShape: function(/* Object */ ctx){
			var r = this.canvasPath;
			ctx.beginPath();
			for(var i = 0; i < r.length; i += 2){
				ctx[r[i]].apply(ctx, r[i + 1]);
			}
		},
		_renderDashedStroke: hasNativeDash ? function(){} : function(ctx, apply){
			var r = this._dashedPath;
			ctx.beginPath();
			for(var i = 0; i < r.length; i += 2){
				ctx[r[i]].apply(ctx, r[i + 1]);
			}
			if(apply) ctx.stroke();
		},
		_moveToA: function(result, action, args, doDash){
			result.push("moveTo", [args[0], args[1]]);
			if(doDash) doDash.push("moveTo", [args[0], args[1]]);
			for(var i = 2; i < args.length; i += 2){
				result.push("lineTo", [args[i], args[i + 1]]);
				if(doDash)
					this._dashResidue = canvas.toDashedLineTo(doDash, this, args[i - 2], args[i - 1], args[i], args[i + 1], this._dashResidue);
			}
			this.last.x = args[args.length - 2];
			this.last.y = args[args.length - 1];
			this.lastControl = {};
		},
		_moveToR: function(result, action, args, doDash){
			var pts;
			if("x" in this.last){
				pts = [this.last.x += args[0], this.last.y += args[1]];
				result.push("moveTo", pts);
				if(doDash) doDash.push("moveTo", pts);
			}else{
				pts = [this.last.x = args[0], this.last.y = args[1]];
				result.push("moveTo", pts);
				if(doDash) doDash.push("moveTo", pts);
			}
			for(var i = 2; i < args.length; i += 2){
				result.push("lineTo", [this.last.x += args[i], this.last.y += args[i + 1]]);
				if(doDash)
					this._dashResidue = canvas.toDashedLineTo(doDash, this, doDash[doDash.length - 1][0], doDash[doDash.length - 1][1], this.last.x, this.last.y, this._dashResidue);
			}
			this.lastControl = {};
		},
		_lineToA: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 2){
				if(doDash)
					this._dashResidue = canvas.toDashedLineTo(doDash, this, this.last.x, this.last.y, args[i], args[i + 1], this._dashResidue);
				result.push("lineTo", [args[i], args[i + 1]]);
			}
			this.last.x = args[args.length - 2];
			this.last.y = args[args.length - 1];
			this.lastControl = {};
		},
		_lineToR: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 2){
				result.push("lineTo", [this.last.x += args[i], this.last.y += args[i + 1]]);
				if(doDash)
					this._dashResidue = canvas.toDashedLineTo(doDash, this, doDash[doDash.length - 1][0], doDash[doDash.length - 1][1], this.last.x, this.last.y, this._dashResidue);
			}
			this.lastControl = {};
		},
		_hLineToA: function(result, action, args, doDash){
			for(var i = 0; i < args.length; ++i){
				result.push("lineTo", [args[i], this.last.y]);
				if(doDash)
					this._dashResidue = canvas.toDashedLineTo(doDash, this, doDash[doDash.length - 1][0], doDash[doDash.length - 1][1], args[i], this.last.y, this._dashResidue);
			}
			this.last.x = args[args.length - 1];
			this.lastControl = {};
		},
		_hLineToR: function(result, action, args, doDash){
			for(var i = 0; i < args.length; ++i){
				result.push("lineTo", [this.last.x += args[i], this.last.y]);
				if(doDash)
					this._dashResidue = canvas.toDashedLineTo(doDash, this, doDash[doDash.length - 1][0], doDash[doDash.length - 1][1], this.last.x, this.last.y, this._dashResidue);
			}
			this.lastControl = {};
		},
		_vLineToA: function(result, action, args, doDash){
			for(var i = 0; i < args.length; ++i){
				result.push("lineTo", [this.last.x, args[i]]);
				if(doDash)
					this._dashResidue = canvas.toDashedLineTo(doDash, this, doDash[doDash.length - 1][0], doDash[doDash.length - 1][1], this.last.x, args[i], this._dashResidue);
			}
			this.last.y = args[args.length - 1];
			this.lastControl = {};
		},
		_vLineToR: function(result, action, args, doDash){
			for(var i = 0; i < args.length; ++i){
				result.push("lineTo", [this.last.x, this.last.y += args[i]]);
				if(doDash)
					this._dashResidue = canvas.toDashedLineTo(doDash, this, doDash[doDash.length - 1][0], doDash[doDash.length - 1][1], this.last.x, this.last.y, this._dashResidue);
			}
			this.lastControl = {};
		},
		_curveToA: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 6){
				result.push("bezierCurveTo", args.slice(i, i + 6));
				if(doDash)
					this._dashResidue = toDashedCurveTo(doDash, this, result[result.length-1], this._dashResidue);
			}
			this.last.x = args[args.length - 2];
			this.last.y = args[args.length - 1];
			this.lastControl.x = args[args.length - 4];
			this.lastControl.y = args[args.length - 3];
			this.lastControl.type = "C";
		},
		_curveToR: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 6){
				result.push("bezierCurveTo", [
					this.last.x + args[i],
					this.last.y + args[i + 1],
					this.lastControl.x = this.last.x + args[i + 2],
					this.lastControl.y = this.last.y + args[i + 3],
					this.last.x + args[i + 4],
					this.last.y + args[i + 5]
				]);
				if(doDash)
					this._dashResidue = toDashedCurveTo(doDash, this, result[result.length-1], this._dashResidue);
				this.last.x += args[i + 4];
				this.last.y += args[i + 5];
			}
			this.lastControl.type = "C";
		},
		_smoothCurveToA: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 4){
				var valid = this.lastControl.type == "C";
				result.push("bezierCurveTo", [
					valid ? 2 * this.last.x - this.lastControl.x : this.last.x,
					valid ? 2 * this.last.y - this.lastControl.y : this.last.y,
					args[i],
					args[i + 1],
					args[i + 2],
					args[i + 3]
				]);
				if(doDash)
					this._dashResidue = toDashedCurveTo(doDash, this, result[result.length-1], this._dashResidue);
				this.lastControl.x = args[i];
				this.lastControl.y = args[i + 1];
				this.lastControl.type = "C";
			}
			this.last.x = args[args.length - 2];
			this.last.y = args[args.length - 1];
		},
		_smoothCurveToR: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 4){
				var valid = this.lastControl.type == "C";
				result.push("bezierCurveTo", [
					valid ? 2 * this.last.x - this.lastControl.x : this.last.x,
					valid ? 2 * this.last.y - this.lastControl.y : this.last.y,
					this.last.x + args[i],
					this.last.y + args[i + 1],
					this.last.x + args[i + 2],
					this.last.y + args[i + 3]
				]);
				if(doDash)
					this._dashResidue = toDashedCurveTo(doDash, this, result[result.length-1], this._dashResidue);
				this.lastControl.x = this.last.x + args[i];
				this.lastControl.y = this.last.y + args[i + 1];
				this.lastControl.type = "C";
				this.last.x += args[i + 2];
				this.last.y += args[i + 3];
			}
		},
		_qCurveToA: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 4){
				result.push("quadraticCurveTo", args.slice(i, i + 4));
			}
			if(doDash)
				this._dashResidue = toDashedCurveTo(doDash, this, result[result.length - 1], this._dashResidue);
			this.last.x = args[args.length - 2];
			this.last.y = args[args.length - 1];
			this.lastControl.x = args[args.length - 4];
			this.lastControl.y = args[args.length - 3];
			this.lastControl.type = "Q";
		},
		_qCurveToR: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 4){
				result.push("quadraticCurveTo", [
					this.lastControl.x = this.last.x + args[i],
					this.lastControl.y = this.last.y + args[i + 1],
					this.last.x + args[i + 2],
					this.last.y + args[i + 3]
				]);
				if(doDash)
					this._dashResidue = toDashedCurveTo(doDash, this, result[result.length - 1], this._dashResidue);
				this.last.x += args[i + 2];
				this.last.y += args[i + 3];
			}
			this.lastControl.type = "Q";
		},
		_qSmoothCurveToA: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 2){
				var valid = this.lastControl.type == "Q";
				result.push("quadraticCurveTo", [
					this.lastControl.x = valid ? 2 * this.last.x - this.lastControl.x : this.last.x,
					this.lastControl.y = valid ? 2 * this.last.y - this.lastControl.y : this.last.y,
					args[i],
					args[i + 1]
				]);
				if(doDash)
					this._dashResidue = toDashedCurveTo(doDash, this, result[result.length - 1], this._dashResidue);
				this.lastControl.type = "Q";
			}
			this.last.x = args[args.length - 2];
			this.last.y = args[args.length - 1];
		},
		_qSmoothCurveToR: function(result, action, args, doDash){
			for(var i = 0; i < args.length; i += 2){
				var valid = this.lastControl.type == "Q";
				result.push("quadraticCurveTo", [
					this.lastControl.x = valid ? 2 * this.last.x - this.lastControl.x : this.last.x,
					this.lastControl.y = valid ? 2 * this.last.y - this.lastControl.y : this.last.y,
					this.last.x + args[i],
					this.last.y + args[i + 1]
				]);
				if(doDash)
					this._dashResidue = toDashedCurveTo(doDash, this, result[result.length - 1], this._dashResidue);
				this.lastControl.type = "Q";
				this.last.x += args[i];
				this.last.y += args[i + 1];
			}
		},
		_arcTo: function(result, action, args, doDash){
			var relative = action == "a";
			for(var i = 0; i < args.length; i += 7){
				var x1 = args[i + 5], y1 = args[i + 6];
				if(relative){
					x1 += this.last.x;
					y1 += this.last.y;
				}
				var arcs = ga.arcAsBezier(
					this.last, args[i], args[i + 1], args[i + 2],
					args[i + 3] ? 1 : 0, args[i + 4] ? 1 : 0,
					x1, y1
				);
				arr.forEach(arcs, function(p){
					result.push("bezierCurveTo", p);
				});
				if(doDash)
					this._dashResidue = toDashedCurveTo(doDash, this, p, this._dashResidue);
				this.last.x = x1;
				this.last.y = y1;
			}
			this.lastControl = {};
		},
		_closePath: function(result, action, args, doDash){
			result.push("closePath", []);
			if(doDash)
				this._dashResidue = canvas.toDashedLineTo(doDash, this, this.last.x, this.last.y, doDash[1][0], doDash[1][1], this._dashResidue);
			this.lastControl = {};
		},
		moveTo: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},
		lineTo: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},
		hLineTo: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},
		vLineTo: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},
		curveTo: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},
		smoothCurveTo: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},
		qCurveTo: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},
		qSmoothCurveTo: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},
		arcTo: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		},
		closePath: function(){
			if(this.parent){
				this.parent._makeDirty();
			}
			return this.inherited(arguments);
		}
	});
});
