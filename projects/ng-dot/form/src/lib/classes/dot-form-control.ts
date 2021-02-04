import {catchConsoleError, toBoolean} from '@ng-dot/core';
import {FormControlAssistType} from '../interfaces/form-control-assist';
import {FormControlAttributes} from '../interfaces/form-control-attributes';
import {FormControlAutocomplete} from '../interfaces/form-control-autocomplete';
import {FormControlDataType, FormControlInterface} from '../interfaces/form-control-interface';
import {FormControlType} from '../interfaces/form-control-type';
import {FormControlOperatorFunction} from '../interfaces/form-operators';
import {FormSelectOption, FormSelectOptionsLike} from '../interfaces/form-select';

const ATTRIBUTES: Array<keyof FormControlAttributes> = [
	'min',
	'max',
	'minLength',
	'maxLength',
	'pattern'
];

export abstract class DotFormControl implements FormControlInterface {
	protected _valid: boolean;

	get valid(): boolean {
		return this._valid;
	}

	set valid(value: boolean) {
		this._valid = value;
	}

	protected _invalid: boolean;

	public get invalid(): boolean {
		return this._invalid;
	}

	public set invalid(value: boolean) {
		this._invalid = value;
	}

	protected _disabled: boolean = null;
	public get disabled(): boolean {
		return this._disabled;
	}

	public set disabled(value: boolean) {
		this._disabled = value;
	}

	type: FormControlType;
	name: string;

	protected _dirty: boolean;
	public get dirty(): boolean {
        return this._dirty;
    }
    public set dirty(value: boolean) {
        this._dirty = value;
    }

	dataType: FormControlDataType;

	label: string = null;
	placeholder = '';
	prefix: string = null;
	suffix: string = null;
	hint: string = null;

	readonly: boolean = null;

	autofocus: boolean = null;
	autocomplete: FormControlAutocomplete = null;
	unuse: boolean = null;
	abstract: boolean = null;
	assist: FormControlAssistType = null;
	nameAsLabel: boolean;

	checked: boolean;
	selectedIndex: number;

	required: boolean = null;
	min: number = null;
	max: number = null;
	minLength: number = null;
	maxLength: number = null;
	pattern: string = null;

	forCreate: boolean;
	forUpdate: boolean;

	options: FormSelectOption[] = null;

	protected _asyncPropertyFunctions: {
		options?: Promise<FormSelectOptionsLike>
	} = {};

	protected _asyncPropertyFunction = false;
	protected _asyncPropertyFunctionCalled = 0;

	protected _validators: Record<string, Function> = {};
	protected _asyncValidators: Record<string, Function> = {};

	protected _freeze: boolean;

	protected _transformer: {
		importer: (value: any) => any,
		exporter: (value: any) => any
	} = {
		importer: null,
		exporter: null
	};

	_value;
	protected _controlElement: any;
	protected _controlNode: HTMLInputElement;

	set value(value) {
		this._value = this.getOriginValue(value);
	}

	get value() {
		return this._value;
	}

	constructor(attributes?: { label?: string } & Partial<FormControlAttributes>) {
		if (!attributes) {
			return;
		}

		const {type, name, value, label} = attributes;

		if (type) {
			this.type = type;
		}

		if (value) {
			this.value = value;
		}

		if (name) {
			this.name = name;
			if (!label) {
				this.label = name;
				this.nameAsLabel = true;
			}
		}

		if (label) {
			this.label = label;
		}

		let current = ATTRIBUTES.length;
		let attrValue;
		let attribute;
		while (current-- > 0) {
			attribute = ATTRIBUTES[current];
			if (attributes.hasOwnProperty(attribute)) {
				attrValue = attributes[attribute];
				this[attribute] = attrValue;
			}
		}

	}

	ready() {
		if (!this._asyncPropertyFunction) {
			return this;
		}
		const {_asyncPropertyFunctions} = this;
		this.disabled = true;
		Object.keys(_asyncPropertyFunctions).forEach((propertyName) => {
			const promise = _asyncPropertyFunctions[propertyName]();
			this._asyncPropertyFunctionCalled++;
			if (promise instanceof Promise) {
				promise
					.then(response => {
						this.setProperty(propertyName, response);
						this.asyncLoaded();
					})
					.catch(catchConsoleError);
			} else {
				this.setProperty(propertyName, promise);
				this.asyncLoaded();
			}
		});

		return this;
	}

	getOriginValue(value: any) {
		const {_transformer: {importer}} = this;
		value = importer ? importer(value) : value;
		return value === undefined || value === null ?
			value :
			value;
	}

	getTypedValue(original?) {
		const {_transformer: {exporter}, type, dataType} = this;

		let value = arguments.length ?
			original :
			this.value;


		switch (dataType) {
			case 'number':
				value = value ? Number(value) : null;
				break;
			case 'boolean':
				value = toBoolean(value);
				break;
			default:
				switch (type) {
					case 'number':
					case 'range':
						value = value ? parseFloat(value) : null;
				}
		}

		return exporter ?
			exporter(value) :
			value;
	}

	setProperty(name, value) {
		if (this[name] === value) {
			return this;
		}

		this[name] = value;
		return this;
	}

	setAsyncProperty(name: string, asyncRequest: Promise<any> | (() => Promise<any>)) {
		this._asyncPropertyFunctions[name] = asyncRequest;
		this._asyncPropertyFunction = true;
		return this;
	}

	setTransform(importer: (value: any) => any, exporter: (value: any) => any) {
		this._transformer = {
			importer,
			exporter
		};
		return this;
	}

	asyncLoad() {
		this._asyncPropertyFunctionCalled++;
		return this;
	}

	asyncLoaded() {
		if (!(--this._asyncPropertyFunctionCalled)) {
			this.setProperty('disabled', false);
		}
		return this;
	}

	setValidator(name: string, validatorFunction: (...args: any[]) => any) {
		this._validators[name] = validatorFunction;
		return this;
	}

	setAsyncValidator(name: string, validatorFunction: (...args: any[]) => any) {
		this._asyncValidators[name] = validatorFunction;
		return this;
	}

	setEvent(type: string, callback: Function) {
		return this;
	}

	setValue(value) {
		this._value = this.getOriginValue(value);
		return this;
	}

	setNode(node) {
		this._controlNode = node;
	}

	getNode() {
		return this._controlNode;
	}

	reset() {
		this.value = null;
		return this;
	}

	focus() {
		const {_controlElement} = this;
		if (_controlElement) {
			_controlElement.focus();
		}
		return this;
	}

	/**
	 * Form Control Piping
	 * @param operators
	 */
	pipe(...operators: FormControlOperatorFunction[]): this;
	pipe(...operators) {
		return operators.reduce((target, operator) => {
			return operator(target);
		}, this);
	}

	setElement(element: HTMLElement) {
		this._controlElement = element;
		return this;
	}

	freeze(flag = true) {
		if (flag) {
			if (this.disabled) {
				return;
			}
		} else {
			if (!this._freeze) {
				return;
			}
		}
		this._freeze = flag;
		this.disabled = flag;
		return this;
	}

	release(flag = true) {
		return this.freeze(!flag);
	}
}