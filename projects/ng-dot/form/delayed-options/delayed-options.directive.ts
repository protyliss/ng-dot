import {
	Directive,
	ElementRef, EventEmitter,
	HostListener,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {optionSelect} from '@ng-dot/form';

@Directive({
	selector: 'select[dot-delayed-options]'
})
export class DelayedOptionsDirective implements OnInit, OnDestroy, OnChanges {
	@Input() options;

	@Input() pendingText = 'Pending';
	@Input() defaultText: string;
	@Input() defaultValue: string;

	@Input() value: string;

	@Output() changed$ = new EventEmitter<string | number>();

	protected _node: HTMLSelectElement;
	protected _selfRenderOptions = this._renderOptions.bind(this);
	protected _renderSubscription = new Subscription();

	protected _optionsInit: boolean;
	protected _optionsRendered: boolean;

	constructor(elementRef: ElementRef) {
		this._node = elementRef.nativeElement;
	}

	@HostListener('change')
	_onChange() {
		const {_node} = this;
		const {selectedIndex} = _node;
		const value = !selectedIndex && this.defaultValue === undefined ?
			null :
			_node.options[selectedIndex].value;
		this.changed$.emit(value);
	}

	ngOnInit(): void {
		this._optionInit();
	}

	ngOnChanges(changes: SimpleChanges): void {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			let value = change.currentValue;

			if (key === 'value') {
				if (typeof value === 'number') {
					value = String(value);
				}
			}

			this[key] = value;

			if (!this._optionsInit) {
				return;
			}

			switch (key) {
				case 'options':
					this._optionsInit = false;
					this._optionsRendered = false;
					this._optionInit();
					break;
				case 'value':
					this._selectedUpdate();
					break;
			}
			this[key] = value;
		});
	}

	ngOnDestroy(): void {
		this._renderSubscription.unsubscribe();
	}

	protected _optionInit() {
		this._optionsInit = true;

		this._attachEvent();

		const {_node} = this;
		_node.innerHTML = '';

		if (!this.options) {
			_node.disabled = true;
			return this._setDisplayOption(this.pendingText);
		}

		_node.disabled = false;
		
		if (!this.value) {
			if (this.defaultText) {
				return this._setDisplayOption(this.defaultText);
			}
			return;
		}

		this._addSelectedOption();
	}

	protected _attachEvent() {
		const {_node, _selfRenderOptions, _renderSubscription} = this;
		_renderSubscription.add(fromEvent(_node, 'focus').subscribe(_selfRenderOptions));
		_renderSubscription.add(fromEvent(_node, 'mouseover').subscribe(_selfRenderOptions));
	}

	protected _renderOptions() {
		const {options} = this;

		if (!options) {
			return;
		}

		this._renderSubscription.unsubscribe();

		if (this.defaultText) {
			this._setDisplayDefault();
		}

		const {_node, value} = this;

		options.forEach(option => {
			const optionValue = option.value;
			// tslint:disable-next-line:triple-equals
			_node.options.add(new Option(option.text, optionValue, null, optionValue == value));
		});

		this._optionsRendered = true;
	}

	protected _setDisplayOption(text: string, value?: string) {
		this._node.innerHTML = '';
		this._node.add(new Option(text || value, value));
	}
	
	protected _setDisplayDefault(){
		this._setDisplayOption(this.defaultText);
	}

	protected _addSelectedOption() {
		const {value} = this;
		if (!this.options.some((option) => {
			// for string and number
			// tslint:disable-next-line:triple-equals
			if (option.value != value) {
				return false;
			}
			this._setDisplayOption(option.text, option.value);
			return true;
		})) {
			this._setDisplayDefault();
		}
	}

	protected _selectedUpdate() {
		if (this._optionsRendered) {
			return optionSelect(this._node, this.value);
		}

		this._addSelectedOption();
	}
}
