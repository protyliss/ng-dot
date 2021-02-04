import {ElementRef, Injectable, Injector} from '@angular/core';
import {fromEvent, Subject, Subscription, timer} from 'rxjs';
import {Numbers} from '../extends/numbers';
import {getNode} from '../functions/get-node';
import {DotStyleService} from './dot-style.service';

export interface ElementControlService {
	active(elementRef: ElementRef);

	// tslint:disable-next-line:unified-signatures
	active(element: HTMLElement);
}

export interface ElementMoveOptionsBase {
	usePercent?: boolean;
	target?: ElementRef | HTMLElement;
	parent?: ElementRef | HTMLElement;
	area?: ElementRef | HTMLElement;
}

export interface ElementMoveOptionsWithPosition extends ElementMoveOptionsBase {
	position: [number, number];
}

export interface ElementMoveOptions extends ElementMoveOptionsBase {
	x?: number;
	y?: number;
	movable?: boolean;
}

export type ElementMoveOptionsLike =
	| [number, number]
	| ElementMoveOptionsWithPosition
	| ElementMoveOptions;


@Injectable({
	providedIn: 'root'
})
export class DotMoveService implements ElementControlService {
	constructor(protected _injector: Injector) {

	}

	active(node, options?: ElementMoveOptionsLike);
	active(node, options?) {
		return new ElementMover(this._injector, node, options);
	}
}

export class ElementMover {
	constructor(
		protected _injector: Injector,
		_node: ElementRef | HTMLElement,
		_options?: ElementMoveOptionsLike
	) {
		_node = getNode(_node) as HTMLElement;
		this._node = _node;
		this._style = _injector.get(DotStyleService);

		const parentNode = _node.parentNode;

		if (_options) {
			if (Array.isArray(_options)) {
				this._targetNode = _node;
				this._x = Number(_options[0]);
				this._y = Number(_options[1]);
				this.to(this._x, this._y);
			} else {
				const {usePercent, parent, target, area} = _options;
				this.usePercent = usePercent;
				this._parentNode = parent ? getNode(parent) : parentNode as any;
				this._targetNode = target ? getNode(target) : _node;
				this._areaNode = area ? getNode(area) : _node;

				if (_options['position']) {
					const {position} = _options as ElementMoveOptionsWithPosition;
					this.to(position[0], position[1]);
				} else {
					const {x, y} = _options as ElementMoveOptions;
					if (x !== undefined && y !== undefined) {
						this._x = Number(x);
						this._y = Number(y);
						this.to(this._x, this._y);
					}
				}

				this._movable = _options['movable'] === undefined ?
					true :
					_options['movable'];
			}
		} else {
			this._targetNode = _node;
			this._areaNode = parentNode as HTMLElement;
		}
		this._targetNode.style.transformOrigin = '0 0';
		this._setMoveByTranslate(0, 0);
		this._subscription.add(fromEvent(_node, 'click').subscribe(this._onClick.bind(this)));

		if (this._movable) {
			this._setEvent();
		}
	}

	usePercent: boolean;

	clicked$ = new Subject;
	moved$ = new Subject;

	protected _node: HTMLElement;
	protected _parentNode: HTMLElement;
	protected _areaNode: HTMLElement;

	protected _style: DotStyleService;

	protected _options: ElementMoveOptions;

	protected _targetNode: HTMLElement;


	protected _movable = true;
	protected _move: boolean;
	protected _moved: boolean;

	protected _startX: number;
	protected _startY: number;
	protected _endX = 0;
	protected _endY = 0;

	protected _x = 0;
	protected _y = 0;

	protected _subscription = new Subscription;
	protected _eventSubscription: Subscription;
	protected _leave$ = new Subject<boolean>();

	protected _selfSetEvent = this._setEvent.bind(this);
	protected _selfOnMouseDown = this._onMouseDown.bind(this);
	protected _selfOnMouseMove = this._onMouseMove.bind(this);
	protected _selfOnLeave = this._onMouseLeave.bind(this);

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	enable(flag?: boolean);
	enable(flag = true) {
		if (flag) {
			if (!this._movable) {
				this._setEvent();
			}
		} else {
			if (this._movable) {
				this._reset();
			}
		}
		this._movable = flag;
	}

	disable(flag?: boolean);
	disable(flag = true) {
		return this.enable(!flag);
	}

	protected _setEvent() {
		this._reset();
		const {_eventSubscription, _node} = this;
		_eventSubscription.add(fromEvent(_node, 'mousedown').subscribe(this._selfOnMouseDown));
		_eventSubscription.add(
			fromEvent(_node, 'dblclick')
				.subscribe(() => {
					this.to(0, 0);
				})
		);
		_eventSubscription.add(this._leave$.subscribe(this._selfSetEvent));
	}

	protected _onClick(event: MouseEvent) {
		this._leave$.next(true);
		if (this._moved) {
			if (this._movable) {
				this.moved$.next({
					x: this._x,
					y: this._y
				});
			}
			event.stopPropagation();
		} else {
			this.clicked$.next();
		}
	}

	protected _onMouseDown(event: MouseEvent);
	protected _onMouseDown(event) {
		// console.log('mouse down');
		
		this._eventSubscription.add(
			timer(120).subscribe(() => {
				this._onDelayedMouseDown(event);
			})
		);
		this._moved = false;

		event.stopPropagation();
	}

	protected _onDelayedMouseDown(event: MouseEvent);
	protected _onDelayedMouseDown(event) {
		// console.log('mouse delayed mouse down');
		
		this._node.classList.add('_element-move');
		this._startX = event.x;
		this._startY = event.y;
		// this._targetNode.style.zIndex = '1';
		this._setStopEvent();

		event.stopPropagation();
	}

	protected _onMouseMove(event: MouseEvent);
	protected _onMouseMove(event) {
		// console.log('mouse delayed mouse move');
		
		this._move = true;
		
		const {x, y} = event;
		this._setMoving(
			this._endX = x - this._startX,
			this._endY = y - this._startY
		);

		event.stopPropagation();
	}

	protected _onMouseLeave() {
		// console.log('leave', Math.random());

		this._leave$.next(true);
		this._node.classList.remove('_element-move');

		if (!this._move) {
			return;
		}
		this._move = false;
		this._moved = true;

		const {_x, _y, _endX, _endY, _parentNode} = this;

		if (this.usePercent) {
			const {scrollWidth, scrollHeight} = _parentNode;

			let x = _x + (_endX / scrollWidth * 100);
			let y = _y + (_endY / scrollHeight * 100);

			x = Numbers.range(x, 100);
			y = Numbers.range(y, 100);

			this._targetNode.style.left = x + '%';
			this._targetNode.style.top = y + '%';

			this._style.translate(this._targetNode, 0, 0);

			this._x = x;
			this._y = y;

		} else {
			this._x += _endX;
			this._y += _endY;
		}

		// this._targetNode.style.zIndex = 'inherit';
	}

	protected _setStopEvent() {
		const {_node} = this;
		const {_eventSubscription} = this;

		
		// _eventSubscription.add(fromEvent(_node, 'mouseup').subscribe(this._selfOnLeave));
		// _eventSubscription.add(fromEvent(_node, 'mouseleave').subscribe(this._selfOnLeave));
		// _eventSubscription.add(fromEvent(_node, 'mousemove').subscribe(this._selfOnMouseMove));
		 
		_eventSubscription.add(fromEvent(document, 'mouseup').subscribe(this._selfOnLeave));
		_eventSubscription.add(fromEvent(document, 'mouseleave').subscribe(this._selfOnLeave));
		_eventSubscription.add(fromEvent(document, 'mousemove').subscribe(this._selfOnMouseMove));
	}


	protected _setMove(x, y) {
		if (this.usePercent) {
			this._targetNode.style.left = x + '%';
			this._targetNode.style.top = y + '%';
		} else {
			this._setMoveByTranslate(x, y);
		}
		this._setMove = this._setMoveByTranslate;
	}

	protected _setMoveByTranslate(x, y);
	protected _setMoveByTranslate(x, y) {
		this._style.translate(this._targetNode, x, y);
	}

	protected _setMoving(x: number, y: number);
	protected _setMoving(x, y) {
		if (!this.usePercent) {
			x += this._x;
			y += this._y;
		}

		this._setMove(x, y);
	}

	to(x: string | number, y: string | number);
	to(x, y) {
		this._x = x;
		this._y = y;
		this._setMove(x, y);
		return this;
	}

	addX(x: number);
	addX(x) {
		this._x += x;
		this._setMove(this._x, this._y);
	}

	addY(y: number);
	addY(y) {
		this._y += y;
		this._setMove(this._x, this._y);
	}

	_reset() {
		// console.log('reset subscription');
		if (this._eventSubscription) {
			this._eventSubscription.unsubscribe();
		}
		this._eventSubscription = new Subscription;
	}

	destroy() {
		this._reset();
	}
}
