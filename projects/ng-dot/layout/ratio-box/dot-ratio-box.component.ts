import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnChanges,
	OnInit, SimpleChanges,
	ViewEncapsulation
} from '@angular/core';

@Component({
	selector: 'dot-ratio-box, *[dot-ratio-box]',
	template: `
		<ng-content></ng-content>
	`,
	styleUrls: ['./dot-ratio-box.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-ratio-box',
	},
	providers: []
})
/**
 * @deprecated using dotRatioBox 
 */
export class DotRatioBoxComponent implements OnInit, OnChanges {
	@Input() ratio: number;

	protected _node: HTMLElement;

	constructor(elementRef: ElementRef<HTMLElement>) {
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