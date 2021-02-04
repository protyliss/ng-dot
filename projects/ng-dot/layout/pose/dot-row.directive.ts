import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SelectorHold} from '@ng-dot/core';
import {DotPoseStyleService} from './dot-pose-style';

type PoseAlign = 'around' | 'between';

@Directive({
	selector: '[dotRow]',
	host: {
		class: 'dot-row'
	}
})
export class DotRowDirective implements OnInit, OnChanges {
	@Input('dotRow') set fromSelector(type: PoseAlign) {
		this.justify = type;
	}

	@Input() justify: PoseAlign;
	@Input() align = 'middle';

	protected _justifyHolder: SelectorHold<string>;
	protected _alignHolder: SelectorHold<string>;

	constructor(
		style: DotPoseStyleService,
		elementRef: ElementRef<HTMLElement>
	) {
		const {nativeElement} = elementRef;

		this._justifyHolder = new SelectorHold(nativeElement, {prefix: '_'});
		this._alignHolder = new SelectorHold(nativeElement, {prefix: '_'});
	}

	ngOnInit() {
		this._update();
	}

	ngOnChanges(changes: SimpleChanges) {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			const value = change.currentValue;
			this[key] = value;

			switch (key) {
				case 'dotRow':
				case 'align':
					this._update();
					break;
				default:
			}
		});
	}

	protected _update() {
		const {_justifyHolder, justify, _alignHolder, align} = this;

		if (justify) {
			_justifyHolder.set(justify);
		} else {
			_justifyHolder.pop();
		}

		if (align) {
			_alignHolder.set(align);
		} else {
			_alignHolder.pop();
		}
	}
}