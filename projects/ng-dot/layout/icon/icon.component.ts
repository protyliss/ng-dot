import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewEncapsulation
} from '@angular/core';
import {SelectorHold} from '@ng-dot/core';

@Component({
	selector: 'dot-icon, i[dot-icon]',
	templateUrl: './icon.html',
	styleUrls: ['./icon.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[hidden]': '!label'
	}
})
export class IconComponent implements OnInit, OnChanges {

	@Input('dot-icon') set fromSelector(label: string) {
		if (label) {
			this.label = label;
		}
	}

	@Input() group = 'icon';
	
	@Input() label: string;
	
	@Input() innerHTML: string;
	
	@Input() prefix = '';

	protected _groupSelectorHolder: SelectorHold;
	private _labelSelectorHolder: SelectorHold;
	protected _node: HTMLElement;
	protected _init: boolean;
	protected _label: string;

	withLabel: boolean;

	constructor(
		elementRef: ElementRef
	) {
		this._node = elementRef.nativeElement;
		this._node.classList.add('icon');
		this._groupSelectorHolder = new SelectorHold(this._node);
		this._labelSelectorHolder = new SelectorHold(this._node);
		this.withLabel = this._node.tagName !== 'I';
	}

	ngOnInit(): void {
		this._init = true;
		this._update();

	}

	ngOnChanges(changes: SimpleChanges) {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			this[key] = change.currentValue;
			if (!this._init) {
				return;
			}
			switch (key) {
				case 'group':
				case 'prefix':
				case 'dot-icon':
				case 'innerHTML':
					this._update();
			}
		});
	}

	protected _update() {
		const {group} = this;
		this._groupSelectorHolder.set(group);
		this._labelSelectorHolder.set(group + '-' + this.prefix + this.label);
	}
}