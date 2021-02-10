import {FormControlAssistType} from './form-control-assist';
import {FormControlAutocomplete} from './form-control-autocomplete';
import {FormControlType} from './form-control-type';
import {FormControlOperatorFunction} from './form-operators';
import {FormSelectOption, FormSelectOptionsLike} from './form-select';

export type FormControlDataType = 'string' | 'number' | 'boolean';

export interface FormControlInterface {
	type: FormControlType;
	name?: string;

	value: string;

	valid: boolean;
	invalid: boolean;

	dirty: boolean;

	/**
	 * export data type
	 */
	dataType: FormControlDataType;

	/**
	 * <label>
	 */
	label: string;
	nameAsLabel: boolean;
	/**
	 * [placeholder]
	 */
	placeholder: string;
	prefix: string;
	suffix: string;
	hint: string;

	/**
	 * [readonly]
	 */
	readonly: boolean;
	/**
	 * [disabled]
	 */
	disabled: boolean;
	/**
	 * [autofocus]
	 */
	autofocus: boolean;
	/**
	 * [autocomplete]
	 */
	autocomplete: FormControlAutocomplete;

	checked: boolean;

	selectedIndex: number;

	unuse: boolean;
	abstract: boolean;
	assist: FormControlAssistType;

	/**
	 * [required]
	 */
	required: boolean;
	/**
	 * [min]
	 */
	min: number;
	/**
	 * [max]
	 */
	max: number;
	/**
	 * [minlength]
	 */
	minLength: number;
	/**
	 * [maxlength]
	 */
	maxLength: number;
	/**
	 * [pattern]
	 */
	pattern: string;

	options: FormSelectOption[];

	forCreate: boolean;
	forUpdate: boolean;

	setNode(node: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLElement);

	getNode(): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLElement;

	focus(): this;

	reset(): this;

	pipe(...operators: FormControlOperatorFunction[]): this;

	ready(): this;

	getTypedValue(origin: any): string | number;

	setProperty(name: string, value: any): this;

	setAsyncProperty(name: string, value: any): this;

	asyncLoad(): this;

	asyncLoaded(): this;

	setTransform(importer: (value: any) => any, exporter: (value: any) => any): this;

	setValidator(name: string, validatorFunction: (...args: any[]) => any);

	setAsyncValidator(name: string, validatorFunction: (...args: any[]) => any);

	setElement(element: HTMLElement): this;

	setEvent(type: string, method: (...args: any[]) => any): this;

	setValue(value): this;

	freeze(): this;

	release(): this;
}
