import {ElementRef, Injectable, Injector} from '@angular/core';
import {fromEvent, Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {getNode} from '../functions/get-node';
import {DotStyleService} from './dot-style.service';

interface ZoomOptions {
	target?: ElementRef | HTMLElement;
	width?: number;
	height?: number;
	zoom?: string | number;
	fit?: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class DotZoomService {
	constructor(protected _injector: Injector) {
	}

	active(elementRef: ElementRef | HTMLElement, options?: ZoomOptions);
	active(node, options) {
		return new ElementZoomer(this._injector, node, options);
	}
}

export class ElementZoomer {
	protected _subscription = new Subscription;

	protected _style: DotStyleService;
	protected _node: HTMLElement;
	protected _targetNode: HTMLElement;

	protected scaleWidth: number;
	protected scaleHeight: number;

	protected _disabled: boolean;
	protected _fitted: boolean;

	level = 1;
	amount = 0.1;
	width: number;
	height: number;

	options: ZoomOptions;


	changed$ = new Subject<number>();

	constructor(
		protected _injector: Injector,
		node: ElementRef | HTMLElement,
		options: ZoomOptions
	) {
		node = getNode(node) as HTMLElement;
		this._node = node;
		this._style = _injector.get(DotStyleService);


		const {_subscription} = this;

		_subscription.add(
			fromEvent(node, 'mousewheel')
				.subscribe((event: WheelEvent) => {
					if (this._disabled) {
						return;
					}

					if (event.deltaY < 0) {
						this.in();
					} else {
						this.out();
					}
					event.preventDefault();
				})
		);

		_subscription.add(fromEvent(node, 'dblclick').subscribe(this.fit.bind(this)));

		_subscription.add(
			fromEvent(window, 'resize')
				.pipe(debounceTime(48))
				.subscribe(() => {
					if (this._fitted) {
						this.fit();
					}
				})
		);

		if (options) {
			this._targetNode = getNode(options['target'] || node);
			this.width = options.width;
			this.height = options.height;
			if (options.zoom) {
				this.level = parseFloat(options.zoom as any);
			}

			this.options = options;
		} else {
			this._targetNode = node;
		}

		this._setSize();
	}


	protected setLevel(level) {
		level = parseFloat(level).toFixed(2);

		if (level < 0) {
			level = this.amount;
		}

		this.level = level;
		this.changed$.next(level);
		this._setScaleSize();
		return this;
	}

	protected _setScaleSize() {
		const {level} = this;

		this.scaleWidth = this.width * level;
		this.scaleHeight = this.height * level;

		const {style} = this._targetNode;
		style.width = this.scaleWidth + 'px';
		style.height = this.scaleHeight + 'px';
	}

	protected _setSize() {
		const {_targetNode} = this;

		if (!this.width) {
			this.width = _targetNode.scrollWidth;
		}
		if (!this.height) {
			this.height = _targetNode.scrollHeight;
		}

		if (this.options.fit) {
			this.fit();
		}

		this._setScaleSize();
		this.align();
	}

	align() {
		const {_node, _targetNode} = this;

		const {width: parentWidth, height: parentHeight} = _node.getBoundingClientRect();

		const left = Math.round((parentWidth - this.scaleWidth) / 2);
		const top = Math.round((parentHeight - this.scaleHeight) / 2);

		_targetNode.style.left = left + 'px';
		_targetNode.style.top = top + 'px';

	}

	origin() {
		this._fitted = false;
		this.setLevel(1);
		this.align();
	}

	fit(event?) {
		this._fitted = true;
		const {_node, width, height} = this;

		const {width: parentWidth, height: parentHeight} = _node.getBoundingClientRect();

		const widthRatio = (parentWidth / width);
		const heightRatio = (parentHeight / height);

		let level = 1;

		if (widthRatio > heightRatio) {
			level = heightRatio;
		} else {
			level = widthRatio;
		}

		this.setLevel(level);
		this.align();

		if (event) {
			event.preventDefault();
		}
	}

	in() {
		return this.setLevel(Number(this.level) + this.amount);
	}

	out() {
		return this.setLevel(Number(this.level) - this.amount);
	}

	disabled() {
		this._disabled = true;
	}

	destroy() {
		this._subscription.unsubscribe();
		this.changed$.complete();
	}
}
