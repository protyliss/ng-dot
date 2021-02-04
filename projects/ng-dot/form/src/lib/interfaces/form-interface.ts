import {FormControlMap, FormControlMapBase} from './form-control-type';
import {FormTypeOperatorFunction} from './form-operators';


export type  FormReturnControlType<OPERATOR_FUNCTION extends FormTypeOperatorFunction<any>, MAP extends FormControlMapBase> =
	OPERATOR_FUNCTION extends FormTypeOperatorFunction<infer TYPE> ?
		// TYPE extends FormControlInputType ?
		// 	MAP['text'] :
		MAP[TYPE] :
		ReturnType<OPERATOR_FUNCTION>;

/**
 * form[enctype]
 */
export type FormEncType =
	| 'application/x-www-form-urlencoded'
	| 'multipart/form-data'
	| 'text/plain';

/**
 * form[method]
 */
export type FormMethod =
	| 'get'
	| 'post';

export interface FormInterface<MAP extends FormControlMapBase = FormControlMap> {
	/**
	 * Form Controls as array
	 */
	controls: any[]; // FormControlOf<MAP>[];

	/**
	 * Form Control names as array
	 */
	controlNames: string[];

	/**
	 * Form Controls as object
	 */
	controlMap: Record<string, any>; // Record<string, FormControlOf<MAP>>;

	/**
	 * All Controls Values
	 */
	value: Record<string, any> | FormData;

	dirty: boolean;
	valid: boolean;
	invalid: boolean;
	touched: boolean;

	method: string;
	action: string;
	enctype: FormEncType;

	focus(): this;
	reset(): this;
	freeze(flag?: boolean): this;

	asCreate(values?: {}): this;
	asUpdate(values?: {}): this;
}