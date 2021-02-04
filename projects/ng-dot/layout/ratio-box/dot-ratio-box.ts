import {
	ChangeDetectionStrategy,
	Component,
	Directive,
	ElementRef,
	Injectable,
	Injector,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewEncapsulation
} from '@angular/core';
import {StyleServiceBase} from '@ng-dot/core';

@Component({
	template: '',
	styleUrls: ['./dot-ratio-box.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DotRatioBoxStyleComponent {

}

@Injectable()
export class DotRatioBoxStyleService extends StyleServiceBase {
	constructor(injector: Injector) {
		super(injector, DotRatioBoxStyleComponent);
	}
}

@Directive({
	selector: '[dotRatioBox]'
})
export class DotRatioBoxDirective implements OnInit, OnChanges {
	@Input() ratio: number;

	protected _node: HTMLElement;

	constructor(
		style: DotRatioBoxStyleService,
		elementRef: ElementRef<HTMLElement>
	) {
		this._node = elementRef.nativeElement;
	}

	ngOnInit() {
		this._render();
	}

	ngOnChanges(changes: SimpleChanges) {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			this[key] = change.currentValue;

			switch (key) {
				case 'ratio':
					this._render();
			}
		});
	}

	protected _render() {
		const {_node} = this;
		let {ratio} = this;

		if (ratio < 1) {
			ratio *= 100;
		}

		_node.style.paddingBottom = ratio + '%';
	}
}