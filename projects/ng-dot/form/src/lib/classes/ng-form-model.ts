import {FormEncType} from '../interfaces/form-interface';
import {FormModelInterface} from '../interfaces/form-model-interface';
import {NgFormScript} from './ng-form-script';

export class NgFormModel implements FormModelInterface {
	readonly form = new NgFormScript;

	method: string;
	action: string;

	enctype: FormEncType;

	get ngFormGroup() {
		return this.form.ngFormGroup;
	}

	get value() {
		return this.form.value;
	}

	get controls() {
		return this.form.controls;
	}

	get controlMap() {
		return this.form.controlMap;
	}

	get controlNames() {
		return this.form.controlNames;
	}

	get valid() {
		return this.form.valid;
	}

	get invalid() {
		return this.form.invalid;
	}

	get dirty() {
		return this.form.dirty;
	}

	get touched() {
		return this.form.touched;
	}

	focus() {
		this.form.focus();
		return this;
	}

	reset(values?: {}) {
		this.form.reset(values);
		return this;
	}


	asCreate(values?: {}) {
		this.form.asCreate(values);
		this.atCreate();

		return this;
	}

	asUpdate(values?: {}) {
		this.form.asUpdate(values);
		this.atUpdate();

		return this;
	}

	freeze(flag = true) {
		this.form.freeze(flag);
		return this;
	}

	protected atCreate(): void {
	}

	protected atUpdate(): void {
	}
}