import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Directive, HostBinding, Injector, Input, OnDestroy} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {FormControlInterface} from '../interfaces/form-control-interface';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ControlComponentBase
	implements OnDestroy, ControlValueAccessor {

	static nextId = 0;

	@Input() control: FormControlInterface;

	protected _placeholder: string;
	protected _required = false;
	protected _disabled = false;


	focused: boolean;
	errorState: boolean;
	describedBy = '';

	protected _value;

	//////////////////////////////

	onChange = (_: any) => { /* Empty */
	};

	onTouched = () => { /* Empty */
	};

	// MatFormFieldControl
	@HostBinding() id = `control-component${ControlComponentBase.nextId++}`;

	// MatFormFieldControl
	@Input()
	set value(value: any) {
		this.onChange(value);
		this.control.value = value;
	}

	get value() {
		return this.control ?
			this.control.value :
			null;
	}

	@Input()
	get placeholder(): string {
		return this._placeholder;
	}

	set placeholder(value: string) {
		this._placeholder = value;
	}

	@Input()
	get required(): boolean {
		return this._required;
	}

	set required(value: boolean) {
		this._required = coerceBooleanProperty(value);
	}

	@Input()
	get disabled(): boolean {
		return this._disabled;
	}

	set disabled(value: boolean) {
		this._disabled = coerceBooleanProperty(value);
	}

	get empty() {
		return !this.value;
	}

	constructor(injector: Injector) {
	}

	ngOnDestroy() {
	}


	_handleInput(): void {
		this.onChange(this.value);
	}

	// ControlValueAccessor
	writeValue(value): void {
		this.value = value;
	}

	// ControlValueAccessor
	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	// ControlValueAccessor
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	// ControlValueAccessor
	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	//////////////////////////////

	_onFocusChange(origin) {
		if (this.focused && !origin) {
			this.onTouched();
		}
		this.focused = !!origin;
	}
}
