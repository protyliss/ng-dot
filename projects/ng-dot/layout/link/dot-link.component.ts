import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewEncapsulation
} from '@angular/core';
import {MixinComponent, SelectorHold} from '@ng-dot/core';
import {withColor} from '@ng-dot/layout';
import {withLift} from '@ng-dot/layout/lift';
import {withRipple} from '@ng-dot/layout/ripple';

@Component({
	selector: '[dot-link]',
	template: `
		<span class="dot-link-area">
			<ng-content></ng-content>
		</span>
	`,
	styleUrls: ['./dot-link.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-link'
	},
	providers: [],
	inputs: ['color', 'lift', 'ripple']
})
export class DotLinkComponent extends MixinComponent.apply(withColor, withLift, withRipple)
	implements OnInit, OnChanges {
	protected _shapeClassNameHolder: SelectorHold<string>;

	@Input() shape: 'clear' | 'soft' | 'hard' = 'clear';


	ngOnInit() {
		super.ngOnInit();

		this._shapeClassNameHolder = new SelectorHold(this._mixedNode, {prefix: '_'});

		this._renderLink();
	}

	ngOnChanges(changes: SimpleChanges) {
		super.ngOnChanges(changes);
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			const value = change.currentValue;
			if (this._mixedInit) {
				if (key === 'shape') {
					this._renderLink();
				}
			}
		});
	}

	protected _renderLink() {
		this._shapeClassNameHolder.set(this.shape);
	}
}
