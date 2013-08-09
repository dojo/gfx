define([
	"dojo/_base/declare",
	"./Shape",
	"../canvas/Group",
	"./Creator",
	"../matrix"
], function(declare, canvasWithEventsShape, canvasGroup, Creator, m){
	return declare([canvasWithEventsShape, canvasGroup, Creator], {
		_testInputs: function(/*Object*/ ctx, /*Array*/ pos){
			var children = this.children,
				t = this.getTransform(),
				i,
				j,
				input;

			if(children.length === 0){
				return;
			}
			var posbk = [];
			for(i = 0; i < pos.length; ++i){
				input = pos[i];
				// backup position before transform applied
				posbk[i] = {
					x: input.x,
					y: input.y
				};
				if(input.target){
					continue;
				}
				var x = input.x, y = input.y;
				var p = t ? m.multiplyPoint(m.invert(t), x, y) : { x: x, y: y };
				input.x = p.x;
				input.y = p.y;
			}
			for(i = children.length - 1; i >= 0; --i){
				children[i]._testInputs(ctx, pos);
				// does it need more hit tests ?
				var allFound = true;
				for(j = 0; j < pos.length; ++j){
					if(pos[j].target == null){
						allFound = false;
						break;
					}
				}
				if(allFound){
					break;
				}
			}
			if(this.clip){
				// filter positive hittests against the group clipping area
				for(i = 0; i < pos.length; ++i){
					input = pos[i];
					input.x = posbk[i].x;
					input.y = posbk[i].y;
					if(input.target){
						ctx.clearRect(0, 0, 1, 1);
						ctx.save();
						ctx.translate(-input.x, -input.y);
						this._render(ctx, true);
						if(!ctx.getImageData(0, 0, 1, 1).data[0]){
							input.target = null;
						}
						ctx.restore();
					}
				}
			}else{
				for(i = 0; i < pos.length; ++i){
					pos[i].x = posbk[i].x;
					pos[i].y = posbk[i].y;
				}
			}
		}

	});
});
