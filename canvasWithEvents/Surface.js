define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/has",
	"dojo/on",
	"dojo/dom",
	"dojo/dom-geometry",
	"../_base",
	"../canvas/Surface",
	"./Container",
	"./Creator"
], function(lang, declare, has, on, dom, domGeom, g, CanvasSurface, Container, Creator){

	function makeFakeEvent(event){
		// summary:
		//		Generates a "fake", fully mutable event object by copying the properties from an original host Event
		//		object to a new standard JavaScript object.

		var fakeEvent = {};
		for(var k in event){
			if(typeof event[k] === "function"){
				// Methods (like preventDefault) must be invoked on the original event object, or they will not work
				fakeEvent[k] = lang.hitch(event, k);
			}
			else{
				fakeEvent[k] = event[k];
			}
		}
		return fakeEvent;
	}

	// Browsers that implement the current (January 2013) WebIDL spec allow Event object properties to be mutated
	// using Object.defineProperty; some older WebKits (Safari 6-) and at least IE10- do not follow the spec. Direct
	// mutation is, of course, much faster when it can be done.
	has.add("dom-mutableEvents", function(){
		var event = document.createEvent("UIEvents");
		try{
			if(Object.defineProperty){
				Object.defineProperty(event, "type", { value: "foo" });
			}else{
				event.type = "foo";
			}
			return event.type === "foo";
		}catch(e){
			return false;
		}
	});

	//noinspection JSUnresolvedVariable
	has.add("MSPointer", navigator.msPointerEnabled);

	// When events are dispatched using on.emit, certain properties of these events (like target) get overwritten by
	// the DOM. The only real way to deal with this at the moment, short of never using any standard event properties,
	// is to store this data out-of-band and fix up the event object passed to the listener by wrapping the listener.
	// The out-of-band data is stored here.
	var fixedEventData = null;

	return declare([CanvasSurface, Container, Creator], {
		constructor: function(parentNode, width, height){
			// summary:
			//		creates a surface (Canvas)
			// parentNode: Node
			//		a parent node
			// width: String
			//		width of surface, e.g., "100px"
			// height: String
			//		height of this, e.g., "100px"

			var surface = this,
				canvas = this.rawNode;

			g._fixMsTouchAction(surface);

			// any event handler added to the canvas needs to have its target fixed.
			var oldAddEventListener = canvas.addEventListener,
				oldRemoveEventListener = canvas.removeEventListener,
				listeners = [];

			var addEventListenerImpl = function(type, listener, useCapture){
				surface._initMirrorCanvas();

				var actualListener = surface.fixTarget(listener);
				listeners.push({ original: listener, actual: actualListener });
				oldAddEventListener.call(this, type, actualListener, useCapture);
			};
			var removeEventListenerImpl = function(type, listener, useCapture){
				for(var i = 0, record; (record = listeners[i]); ++i){
					if(record.original === listener){
						oldRemoveEventListener.call(this, type, record.actual, useCapture);
						listeners.splice(i, 1);
						break;
					}
				}
			};
			try{
				Object.defineProperties(canvas, {
					addEventListener: {
						value: addEventListenerImpl,
						enumerable: true,
						configurable: true
					},
					removeEventListener: {
						value: removeEventListenerImpl
					}
				});
			}catch(e){
				// Object.defineProperties fails on iOS 4-5. "Not supported on DOM objects").
				canvas.addEventListener = addEventListenerImpl;
				canvas.removeEventListener = removeEventListenerImpl;
			}

			canvas._dojoElementFromPoint = function(x, y){
				// summary:
				//		Returns the shape under the given (x, y) coordinate.
				// evt:
				//		mouse event

				if(!surface.mirrorCanvas){
					return this;
				}

				var surfacePosition = domGeom.position(this, true);

				// use canvas-relative positioning
				x -= surfacePosition.x;
				y -= surfacePosition.y;

				var mirror = surface.mirrorCanvas,
					ctx = mirror.getContext("2d"),
					children = surface.children;

				ctx.clearRect(0, 0, mirror.width, mirror.height);
				ctx.save();
				ctx.strokeStyle = "rgba(127,127,127,1.0)";
				ctx.fillStyle = "rgba(127,127,127,1.0)";
				ctx.pickingMode = true;

				// TODO: Make inputs non-array
				var inputs = [
					{ x: x, y: y }
				];

				// process the inputs to find the target.
				for(var i = children.length - 1; i >= 0; i--){
					children[i]._testInputs(ctx, inputs);

					if(inputs[0].target){
						break;
					}
				}
				ctx.restore();
				return inputs[0] && inputs[0].target ? inputs[0].target.rawNode : this;
			};

			this._elementUnderPointer = null;
		},

		fixTarget: function(listener){
			// summary:
			//		Corrects the `target` properties of the event object passed to the actual listener.
			// listener: Function
			//		An event listener function.

			var surface = this;

			return function(event){
				var k;
				if(fixedEventData){
					if(has("dom-mutableEvents")){
						Object.defineProperties(event, fixedEventData);
					}else{
						event = makeFakeEvent(event);
						for(k in fixedEventData){
							event[k] = fixedEventData[k].value;
						}
					}
				}else{
					// non-synthetic events need to have target correction too, but since there is no out-of-band
					// data we need to figure out the target ourselves
					var canvas = surface.getEventSource(),
						target = canvas._dojoElementFromPoint(
							// touch events may not be fixed at this point, so clientX/Y may not be set on the
							// event object
							(event.changedTouches ? event.changedTouches[0] : event).pageX,
							(event.changedTouches ? event.changedTouches[0] : event).pageY
						);
					if(has("dom-mutableEvents")){
						Object.defineProperties(event, {
							target: {
								value: target,
								configurable: true,
								enumerable: true
							},
							gfxTarget: {
								value: target.shape,
								configurable: true,
								enumerable: true
							}
						});
					}else{
						event = makeFakeEvent(event);
						event.target = target;
						event.gfxTarget = target.shape;
					}
				}

				// fixTouchListener in dojo/on undoes target changes by copying everything from changedTouches even
				// if the value already exists on the event; of course, this canvas implementation currently only
				// supports one pointer at a time. if we wanted to make sure all the touches arrays' targets were
				// updated correctly as well, we could support multi-touch and this workaround would not be needed
				if(has("touch")){
					// some standard properties like clientX/Y are not provided on the main touch event object,
					// so copy them over if we need to
					if(event.changedTouches && event.changedTouches[0]){
						var changedTouch = event.changedTouches[0];
						for(k in changedTouch){
							if(!event[k]){
								if(has("dom-mutableEvents")){
									//noinspection JSUnfilteredForInLoop
									Object.defineProperty(event, k, {
										value: changedTouch[k],
										configurable: true,
										enumerable: true
									});
								}else{
									event[k] = changedTouch[k];
								}
							}
						}
					}
					event.corrected = event;
				}

				return listener.call(this, event);
			};
		},

		_checkPointer: function(event){
			// summary:
			//		Emits enter/leave/over/out events in response to the pointer entering/leaving the inner elements
			//		within the canvas.

			function emit(types, target, relatedTarget){
				// summary:
				//		Emits multiple synthetic events defined in `types` with the given target `target`.

				var oldBubbles = event.bubbles;

				for(var i = 0, type; (type = types[i]); ++i){
					// targets get reset when the event is dispatched so we need to give information to fixTarget to
					// restore the target on the dispatched event through a back channel
					fixedEventData = {
						target: { value: target, configurable: true, enumerable: true},
						gfxTarget: { value: target.shape, configurable: true, enumerable: true },
						relatedTarget: { value: relatedTarget, configurable: true, enumerable: true }
					};

					// bubbles can be set directly, though.
					Object.defineProperty(event, "bubbles", {
						value: type.bubbles,
						configurable: true,
						enumerable: true
					});

					on.emit(canvas, type.type, event);
					fixedEventData = null;
				}

				Object.defineProperty(event, "bubbles", { value: oldBubbles, configurable: true, enumerable: true });
			}

			// Types must be arrays because hash map order is not guaranteed but we must fire in order to match normal
			// event behaviour
			var TYPES = {
					out: [
						{ type: "mouseout", bubbles: true },
						{ type: "MSPointerOut", bubbles: true },
						{ type: "mouseleave", bubbles: false },
						{ type: "dojotouchout", bubbles: true}
					],
					over: [
						{ type: "mouseover", bubbles: true },
						{ type: "MSPointerOver", bubbles: true },
						{ type: "mouseenter", bubbles: false },
						{ type: "dojotouchover", bubbles: true}
					]
				},
				elementUnderPointer = event.target,
				oldElementUnderPointer = this._elementUnderPointer,
				canvas = this.getEventSource();

			if(oldElementUnderPointer !== elementUnderPointer){
				if(oldElementUnderPointer && oldElementUnderPointer !== canvas){
					emit(TYPES.out, oldElementUnderPointer, elementUnderPointer);
				}

				this._elementUnderPointer = elementUnderPointer;

				if(elementUnderPointer && elementUnderPointer !== canvas){
					emit(TYPES.over, elementUnderPointer, oldElementUnderPointer);
				}
			}
		},

		getEventSource: function(){
			return this.rawNode;
		},

		on: function(type, listener){
			// summary:
			//		Connects an event to this surface.

			return on(this.getEventSource(), type, listener);
		},

		connect: function(/*String*/ name, /*Object*/ object, /*Function|String*/ method){
			// summary:
			//		Deprecated. Connects a handler to an event on this surface. Use `on` instead.
			// name: String
			//		The event name
			// object: Object
			//		The object that method will receive as "this".
			// method: Function
			//		A function reference, or name of a function in context.

			if(name.substring(0, 2) == "on"){
				name = name.substring(2);
			}
			return this.on(name, method ? lang.hitch(object, method) : object);
		},

		disconnect: function(handle){
			// summary:
			//		Deprecated. Disconnects a handler. Use `handle.remove` instead.

			handle.remove();
		},

		_initMirrorCanvas: function(){
			// summary:
			//		Initialises a mirror canvas used for event hit detection.

			this._initMirrorCanvas = function(){
			};

			var canvas = this.getEventSource(),
				mirror = this.mirrorCanvas = canvas.ownerDocument.createElement("canvas");

			mirror.width = 1;
			mirror.height = 1;
			mirror.style.position = "absolute";
			mirror.style.left = mirror.style.top = "-99999px";
			canvas.parentNode.appendChild(mirror);

			var moveEvt = "mousemove";
			if(has("MSPointer")){
				moveEvt = "MSPointerMove";
			}else if(has("touch")){
				moveEvt = "touchmove";
			}
			on(canvas, moveEvt, lang.hitch(this, "_checkPointer"));
		},

		destroy: function(){
			if(this.mirrorCanvas){
				this.mirrorCanvas.parentNode.removeChild(this.mirrorCanvas);
				this.mirrorCanvas = null;
			}
			this.inherited(arguments);
		}
	});
});
