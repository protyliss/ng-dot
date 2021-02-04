import {
	ChangeDetectionStrategy,
	Component,
	Directive,
	Injectable,
	Injector,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewEncapsulation
} from '@angular/core';
import {Constructor, extract, MixinComponent, SelectorHold, StyleServiceBase} from '@ng-dot/core';

@Component({
	template: ``,
	styleUrls: [
		'./dot-lift.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DotLiftStyleComponent {
}

@Injectable()
export class DotLiftStyleService extends StyleServiceBase {
	constructor(injector: Injector) {
		super(injector, DotLiftStyleComponent);
	}
}

/**
 * Set Lift class
 * @param BaseClass
 */
export function withLift<T extends Constructor<MixinComponent>>(BaseClass: T) {
	@Directive()
	class MixedLift extends BaseClass implements OnInit, OnChanges {
		@Input() lift: number | string;

		_listClassHolder: SelectorHold;

		ngOnInit() {
			super.ngOnInit();
			
			this._injector.get(DotLiftStyleService);

			this._listClassHolder = new SelectorHold(this._mixedNode, {
				prefix: 'dot-lift'
			});

			this._renderLift();
		}

		ngOnChanges(changes: SimpleChanges) {
			super.ngOnChanges(changes);

			const extracted = extract(changes, ['lift']);
			Object.keys(extracted).forEach(key => {
				const change = extracted[key];
				const value = change.currentValue;
				this[key] = value;
				if (this._mixedInit) {
					if (key === 'lift') {
						this._renderLift();
					}
				}
			})
		}

		_renderLift() {
			this._listClassHolder.set(this.lift + '');
		}
	}

	return MixedLift;
}
