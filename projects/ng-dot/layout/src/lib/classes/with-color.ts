import {Directive, Input, SimpleChanges} from '@angular/core';
import {Constructor, extract, MixinComponent, SelectorHold} from '@ng-dot/core';

/**
 * Set Color class of Theme
 * @param BaseClass
 */
export function withColor<T extends Constructor<MixinComponent>>(BaseClass: T) {
	@Directive()
	class MixedColor extends BaseClass {
		@Input() color: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'warn' = null;

		_colorClassNameHolder: SelectorHold<string>;

		ngOnInit() {
			super.ngOnInit();

			this._colorClassNameHolder = new SelectorHold(this._mixedNode, {
				prefix: '_'
			});

			this._renderColor();
		}

		ngOnChanges(changes: SimpleChanges) {
			super.ngOnChanges(changes);

			const extracted = extract(changes, ['color']);
			Object.keys(extracted).forEach(key => {
				const change = extracted[key];
				const value = change.currentValue;
				this[key] = value;
				if (this._mixedInit) {
					if (key === 'color') {
						this._renderColor();
					}
				}
			})
		}

		_renderColor() {
			this._colorClassNameHolder.set(this.color);
		}
	}

	return MixedColor;
}
