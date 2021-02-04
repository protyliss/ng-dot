import {
	ChangeDetectionStrategy,
	Component,
	Directive,
	Injectable,
	Injector,
	Input,
	SimpleChanges,
	ViewEncapsulation
} from '@angular/core';
import {Constructor, extract, MixinComponent, StyleServiceBase} from '@ng-dot/core';

@Component({
	template: ``,
	styleUrls: ['./dot-ripple.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class DotRippleStyleComponent {
}

@Injectable()
export class DotRippleStyleService extends StyleServiceBase {
	constructor(injector: Injector) {
		super(injector, DotRippleStyleComponent);
	}
}

/**
 * Set Ripple
 * @param BaseClass
 */
export function withRipple<T extends Constructor<MixinComponent>>(BaseClass: T) {
	@Directive()
	class MixedRipple extends BaseClass {
		@Input() ripple = true;

		_attachedRipple: boolean;

		ngOnInit() {
			super.ngOnInit();
			this._attachRipple();
		}

		ngOnChanges(changes: SimpleChanges) {
			super.ngOnChanges(changes);

			const extracted = extract(changes, ['lift']);
			Object.keys(extracted).forEach(key => {
				const change = extracted[key];

				const value = change.currentValue;
				this[key] = value;
				if (this._mixedInit) {
					if (key === 'ripple') {
						if (value) {
							this._attachRipple();
						} else {
							this._detachRipple();
						}
					}
				}
			});
		}

		ngOnDestroy() {
			super.ngOnDestroy();
			this._detachRipple();
		}

		_attachRipple() {
			if (this._attachedRipple || !this.ripple) {
				return;
			}

			this._attachedRipple = true;

			const {_injector, _mixedNode} = this;
			_injector.get(DotRippleStyleService);

			_mixedNode.classList.add('dot-fx-ripple', 'dot-fx-ripple_js');
			_mixedNode.addEventListener('click', setRipple);
		}

		_detachRipple() {
			if (!this._attachedRipple) {
				return;
			}

			this._attachedRipple = false;

			const {_mixedNode} = this;
			_mixedNode.classList.remove('dot-fx-ripple');
			_mixedNode.removeEventListener('click', setRipple);
		}
	}

	return MixedRipple;
}


const ripple = document.createElement('span');
ripple.className = 'dot-fx-ripple-instance';

function setRipple(event: MouseEvent) {
	const span = ripple.cloneNode() as HTMLElement;

	const {x, y} = getRelativeMousePosition(event);

	span.style.left = x + 'px';
	span.style.top = y + 'px';
	span.addEventListener('animationend', remove);
	this.appendChild(span);
}

function getRelativeMousePosition(event: MouseEvent, target?: HTMLElement) {
	const rect = (target || event.target as HTMLElement).getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

function remove(this: HTMLElement) {
	this.parentNode.removeChild(this);
}
