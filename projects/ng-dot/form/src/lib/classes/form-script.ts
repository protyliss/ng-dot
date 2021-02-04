import {FormCheckboxControl} from '../controls/form-checkbox-control';
import {FormInputControl} from '../controls/form-input-control';
import {FormSelectControl} from '../controls/form-select-control';
import {FormTextareaControl} from '../controls/form-textarea-control';
import {FormControlInterface} from '../interfaces/form-control-interface';
import {FormControlMap, FormControlMapBase} from '../interfaces/form-control-type';
import {FormEncType, FormReturnControlType} from '../interfaces/form-interface';
import {
	FormControlOperatorFunction,
	FormPropertyOperatorFunction,
	FormTypeOperatorFunction
} from '../interfaces/form-operators';
import {FormScriptInterface} from '../interfaces/form-script-interface';

export class FormScript<MAP extends FormControlMapBase = FormControlMap> implements FormScriptInterface<MAP> {
	////////////////////////////////////
	// FORM ATTRIBUTES
	////////////////////////////////////
	action: string;
	enctype: FormEncType;
	method: string;

	////////////////////////////////////
	// FORM CONTROLS
	////////////////////////////////////
	controls = [];
	controlMap = {};
	controlNames = [];

	_formData: boolean;

	////////////////////////////////////
	// FORM VALIDATION
	////////////////////////////////////
	private _dirty: boolean;
	public get dirty(): boolean {
		return this._dirty;
	}

	public set dirty(value: boolean) {
		this._dirty = value;
	}

	private _valid: boolean;
	public get valid(): boolean {
		return this._valid;
	}

	public set valid(value: boolean) {
		this._valid = value;
	}

	private _invalid: boolean;
	public get invalid(): boolean {
		return this._invalid;
	}

	public set invalid(value: boolean) {
		this._invalid = value;
	}

	private _touched: boolean;
	public get touched(): boolean {
		return this._touched;
	}

	public set touched(value: boolean) {
		this._touched = value;
	}

	set value(values: Record<string, any>) {
		const {controlMap} = this;

		const keys = Object.keys(values);
		let key;
		let end = keys.length;
		let control;
		while (end-- > 0) {
			key = keys[end];
			control = controlMap[key];
			if (control) {
				control.value = values[key];
			}
		}
	}

	get value() {
		return this.enctype === 'multipart/form-data' ?
			this.getFormData() :
			this.getJson();
	}

	getForm() {
		return this;
	}

	getFormData(): FormData {
		const {controlMap} = this;
		return this.controlNames.reduce(
			(formData, controlName) => {
				const control = controlMap[controlName];
				if (control.abstract) {
					return formData;
				}

				const {type, name, value} = control;

				if (value) {
					if (type === 'file') {
						const node = control.getNode();

						if (!node) {
							return formData;
						}

						const fileList: FileList = node.files;
						const file = fileList[0];
						formData.append(name, file, file.name);
					} else {
						formData.append(name, value);
					}
				}

				return formData;
			},
			new FormData()
		);
	}

	getJson() {
		const {controlMap} = this;
		return this.controlNames.reduce(
			(values, controlName) => {
				const control = controlMap[controlName];
				if (control.abstract) {
					return values;
				}
				const name = control.name;
				values[name] = control.getTypedValue();
				return values;
			},
			{}
		);
	}

	focus() {
		const {controls} = this;
		if (
			!(controls.some(invalidFocusSomeFunction)
				&& !controls.some(autofocusSomeFunction))
		) {
			controls.some(focusableFocusSomeFunction);
		}
		return this;
	}

	reset(values?: {}): this;
	reset(values) {
		this.controls.map(resetMapper);
		if (values) {
			this.value = values;
		}
		return this;
	}

	/**
	 * Set Values Type as FormData
	 * @param flag
	 */
	upload(flag = true) {
		this._formData = flag;
		return this;
	}

	/**
	 * Focus to the emptied optional control when valid form, OR to the invalid control when invalid form
	 */

	asCreate(values?: {}): this;
	asCreate(values) {
		this.controls.forEach(control => {
			// control.pipe(control.forUpdate === true ? $use['false'] : $use['true']);
			const flag = control.forUpdate === true;
			control.unuse = flag;
			control.disabled = flag;
		});
		this.reset(values);
		return this;
	}

	asUpdate(values?: {}): this;
	asUpdate(values) {
		this.controls.forEach(control => {
			// control.pipe(control.forCreate === true ? $use['false'] : $use['true']);
			const flag = control.forCreate === true;
			control.unuse = flag;
			control.disabled = flag;
		});
		this.reset(values);
		return this;
	}

	getConstructor(type) {
		switch (type) {
			case 'select':
				return FormSelectControl;
			case 'textarea':
				return FormTextareaControl;
			case 'radio':
				return FormCheckboxControl;
			case 'checkbox':
				return FormCheckboxControl;
			default:
				return FormInputControl;
		}
	}

	freeze(flag = true) {
		const {controls} = this;
		let current = controls.length;
		while (current-- > 0) {
			controls[current].freeze(flag);
		}
		return this;
	}

	append<T extends keyof FormControlMap>(type: T, name, options?): MAP[T] {
		const constructor = this.getConstructor(type);
		if (!constructor) {
			throw new Error(`${type} is not control type`);
		}

		options = {...options, type, name};
		const control = new constructor(options);

		this.controls.push(control);
		this.controlMap[name] = control;
		this.controlNames.push(name);

		this._onAppended(control);
		return control;
	}

	protected _onAppended(control: FormControlInterface): void {

	}


	pipe<T extends FormTypeOperatorFunction<any>>(
		type: T,
		...control: FormControlOperatorFunction[]
	): FormReturnControlType<T, MAP>;

	pipe<T extends FormTypeOperatorFunction<any>>(
		property: FormPropertyOperatorFunction,
		type: T,
		...control: FormControlOperatorFunction[]
	): FormReturnControlType<T, MAP>;

	pipe<T extends FormTypeOperatorFunction<any>>(
		first: FormPropertyOperatorFunction,
		second: FormPropertyOperatorFunction,
		type: T,
		...control: FormControlOperatorFunction[]
	): FormReturnControlType<T, MAP>;

	pipe<T extends FormTypeOperatorFunction<any>>(
		first: FormPropertyOperatorFunction,
		second: FormPropertyOperatorFunction,
		third: FormPropertyOperatorFunction,
		type: T,
		...control: FormControlOperatorFunction[]
	): FormReturnControlType<T, MAP>;

	pipe(...property: FormPropertyOperatorFunction[]): this;

	pipe(...operators) {
		return operators.reduce((target, operator) => {
			return operator(target);
		}, this);
	}
}

function resetMapper(control: FormControlInterface) {
	control.reset();
}

function invalidFocusSomeFunction(control: FormControlInterface) {
	if (control.invalid) {
		control.focus();
		return true;
	}
}

function autofocusSomeFunction(control: FormControlInterface) {
	if (control.autofocus) {
		control.focus();
		return true;
	}
}

function focusableFocusSomeFunction(control: FormControlInterface) {
	if (control.type !== 'hidden' && typeof control['focus'] === 'function') {
		control.focus();
		return true;
	}
}