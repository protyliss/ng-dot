import {AsyncValidatorFn, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {resetSubscription} from '@ng-dot/core';
import {Subscription} from 'rxjs';
import {DotFormControl} from './dot-form-control';

const NG_VALIDATORS = [
	'min',
	'max',
	'minLength',
	'maxLength',
	'pattern'
];

export class NgFormControl extends DotFormControl {
	protected _ngFormControl: FormControl;
	protected _ngFormControlValueSubscription: Subscription;
	
	protected _validators: Record<string, ValidatorFn> = {};
	protected _asyncValidators: Record<string, AsyncValidatorFn> = {};

	protected _dirty: boolean;

	get ngFormControl(): FormControl {
		if (this._ngFormControl) {
			return this._ngFormControl;
		}

		const {_asyncValidators} = this;

		this._ngFormControl = new FormControl(
			this.value || '',
			null,
			_asyncValidators ?
				Object.values(this._asyncValidators) :
				undefined
		);

		this._ngSetValidators();

		return this._ngFormControl;
	}

	set dirty(flag) {
		this._dirty = flag;
		
		const {ngFormControl} = this;
		
		if (flag) {
			ngFormControl.markAsDirty();
		} else {
			ngFormControl.markAsPristine();
		}
	}

	get dirty() {
		return this._dirty;
	}

	getFormName() {
		return this.name;
	}

	_ngSetValidators() {
		const {_validators} = this;
		const validators = _validators ? Object.values(_validators) : [];

		if (!this.unuse) {
			if (this.required) {
				validators.push(Validators.required);
			}

			if (this.type === 'email') {
				validators.push(Validators.email);
			}

			NG_VALIDATORS.forEach(key => {
				const attrKey = '_' + key;
				if (this[attrKey]) {
					validators.push(Validators[key](this[attrKey]));
				}
			});

		}

		const {ngFormControl} = this;

		ngFormControl.setValidators(Validators.compose(validators as ValidatorFn[]));
		ngFormControl.updateValueAndValidity({
			onlySelf: true
		});

		this._ngFormControlValueSubscription = resetSubscription(this._ngFormControlValueSubscription);
	}

	set value(value) {
		this.setValue(value);
	}

	get value() {
		const {_ngFormControl} = this;

		return _ngFormControl ?
			_ngFormControl.value :
			null;
	}

	get valid() {
		// console.log(this.name, this.unuse, this.ngFormControl.valid, this.ngFormControl.errors);
		return this.unuse || (this.ngFormControl.valid && !this.ngFormControl.errors);
	}

	get invalid() {
		return !this.valid;
	}

	set disabled(flag) {
		this._disabled = flag;
		const {_ngFormControl} = this;

		if (_ngFormControl) {
			_ngFormControl[flag ? 'disable' : 'enable']();
		}
	}

	get disabled() {
		return this._disabled;
	}

	setEvent(type: 'change', callback: Function) {
		switch (type) {
			case 'change':
				this.ngFormControl.valueChanges.subscribe(value => {
					if (this.type === 'custom') {
						callback(this);
					} else {
						callback(this);
					}
				});
		}
		return this;
	}

	setValue(value) {
		this.ngFormControl.setValue(this.getOriginValue(value));
		return this;
	}

	patchValue(value) {
		this.ngFormControl.patchValue(this.getOriginValue(value), {emitEvent: false});
		return this;
	}
}