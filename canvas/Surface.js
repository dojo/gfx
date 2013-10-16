define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/dom",
	"dojo/dom-geometry",
	"../_base",
	"../shape/_SurfaceBase",
	"./Container",
	"./Creator"
], function(lang, declare, dom, domGeom, g, SurfaceBase, Container, Creator){
	return declare([SurfaceBase, Container, Creator], {
		// summary:
		//		a surface object to be used for drawings (Canvas)
		constructor: function(parentNode, width, height){
			// summary:
			//		creates a surface (Canvas)
			// parentNode: Node
			//		a parent node
			// width: String
			//		width of surface, e.g., "100px"
			// height: String
			//		height of surface, e.g., "100px"

			if(!width && !height){
				var pos = domGeom.position(parentNode);
				width = width || pos.w;
				height = height || pos.h;
			}
			if(typeof width == "number"){
				width = width + "px";
			}
			if(typeof height == "number"){
				height = height + "px";
			}

			var p = dom.byId(parentNode),
				c = p.ownerDocument.createElement("canvas");

			c.width = g.normalizedLength(width);	// in pixels
			c.height = g.normalizedLength(height);	// in pixels

			p.appendChild(c);
			this.rawNode = c;
			this._parent = p;
			this.surface = this;

			this.pendingImageCount = 0;
			this.makeDirty();
		},

		setDimensions: function(width, height){
			// summary:
			//		sets the width and height of the rawNode
			// width: String
			//		width of surface, e.g., "100px"
			// height: String
			//		height of surface, e.g., "100px"
			this.width = g.normalizedLength(width);	// in pixels
			this.height = g.normalizedLength(height);	// in pixels
			if(!this.rawNode) return this;
			var dirty = false;
			if(this.rawNode.width != this.width){
				this.rawNode.width = this.width;
				dirty = true;
			}
			if(this.rawNode.height != this.height){
				this.rawNode.height = this.height;
				dirty = true;
			}
			if(dirty)
				this.makeDirty();
			return this;	// self
		},
		getDimensions: function(){
			// summary:
			//		returns an object with properties "width" and "height"
			return this.rawNode ? {width: this.rawNode.width, height: this.rawNode.height} : null;	// Object
		},
		_render: function(force){
			// summary:
			//		render the all shapes
			if(!this.rawNode || (!force && this.pendingImageCount)){
				return;
			}
			var ctx = this.rawNode.getContext("2d");
			ctx.clearRect(0, 0, this.rawNode.width, this.rawNode.height);
			this.render(ctx);
			if("pendingRender" in this){
				clearTimeout(this.pendingRender);
				delete this.pendingRender;
			}
		},
		render: function(ctx){
			// summary:
			//		Renders the gfx scene.
			// description:
			//		this method is called to render the gfx scene to the specified context.
			//		This method should not be invoked directly but should be used instead
			//		as an extension point on which user can connect to with aspect.before/aspect.after
			//		to implement pre- or post- image processing jobs on the drawing surface.
			// ctx: CanvasRenderingContext2D
			//		The surface Canvas rendering context.
			ctx.save();
			for(var i = 0; i < this.children.length; ++i){
				this.children[i]._render(ctx);
			}
			ctx.restore();
		},
		makeDirty: function(){
			// summary:
			//		internal method, which is called when we may need to redraw
			if(!this.pendingImagesCount && !("pendingRender" in this) && !this._batch){
				this.pendingRender = setTimeout(lang.hitch(this, this._render), 0);
			}
		},
		downloadImage: function(img, url){
			// summary:
			//		internal method, which starts an image download and renders, when it is ready
			// img: Image
			//		the image object
			// url: String
			//		the url of the image
			var handler = lang.hitch(this, this.onImageLoad);
			if(!this.pendingImageCount++ && "pendingRender" in this){
				clearTimeout(this.pendingRender);
				delete this.pendingRender;
			}
			img.onload = handler;
			img.onerror = handler;
			img.onabort = handler;
			img.src = url;
		},
		onImageLoad: function(){
			if(!--this.pendingImageCount){
				this.onImagesLoaded();
				this._render();
			}
		},
		onImagesLoaded: function(){
			// summary:
			//		An extension point called when all pending images downloads have been completed.
			// description:
			//		This method is invoked when all pending images downloads have been completed, just before
			//		the gfx scene is redrawn. User can connect to this method to get notified when a
			//		gfx scene containing images is fully resolved.
		},

		// events are not implemented
		getEventSource: function(){
			return null;
		},
		connect: function(){
		},
		disconnect: function(){
		},
		on: function(){
		}
	});
});
