import {FormGroup} from '@angular/forms';
import {FormControlMap, FormControlMapBase} from '../interfaces/form-control-type';
import {FormScript} from './form-script';
import {NgFormControl} from './ng-form-control';
import {NgInputControl} from '../controls/ng-input-control';

/**
 * ScriptForm as Angular Reactive Form
 */
export class NgFormScript<MAP extends FormControlMapBase = FormControlMap> extends FormScript<MAP> {

	protected _formGroup: FormGroup;

	controls: NgFormControl[] = [];
	controlMap: Record<string, NgFormControl> = {};

	get ngFormGroup(): FormGroup {
		if (this._formGroup) {
			return this._formGroup;
		}


		const {controlMap} = this;

		const ngControls = this.controlNames.reduce((controls, name) => {
			const control = controlMap[name];
			controls[control.getFormName()] = control.ngFormControl;
			return controls;
		}, {});

		this._formGroup = new FormGroup(ngControls);

		return this._formGroup;
	}

	get valid() {
		const {ngFormGroup} = this;
		if (ngFormGroup.dirty) {			
			return !this.controls.some(control => {
				if (control.invalid) {
					return true;
				}
			});
		}
		return ngFormGroup.valid;
	}

	get invalid() {
		return !this.valid;
	}

	get touched() {
		return this.ngFormGroup.touched;
	}

	get dirty() {
		return this.ngFormGroup.dirty;
	}

	reset(values?: {}) {
		this.freeze(false);
		this.ngFormGroup.reset();
		if (values) {
			this.value = values;
		}
		return this;
	}

	asCreate(values?: {}) {
		super.asCreate(values);
		this.controls.forEach(validateUpdateForEachFunction);
		return this;
	}

	asUpdate(values?: {}) {
		super.asUpdate(values);
		this.controls.forEach(validateUpdateForEachFunction);
		return this;
	}

	getConstructor(type) {
		return NgInputControl as any;
	}
}

function validateUpdateForEachFunction(control: NgFormControl) {
	control._ngSetValidators();
}