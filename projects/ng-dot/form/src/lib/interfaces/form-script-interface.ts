import {Constructor} from '@ng-dot/core';
import {FormControlMap, FormControlMapBase, FormControlType} from './form-control-type';
import {FormInterface, FormReturnControlType} from './form-interface';
import {FormControlOperatorFunction, FormPropertyOperatorFunction, FormTypeOperatorFunction} from './form-operators';

export interface FormScriptInterface<MAP extends FormControlMapBase = FormControlMap> extends FormInterface<MAP> {
	
	getConstructor(type: FormControlType): Constructor;

	append<T extends keyof FormControlMap>(type: T, name, options?): MAP[T];
	
	/**
	 * Get Control and set Control Property
	 * @param type
	 * @param control
	 */
	pipe<T extends FormTypeOperatorFunction<any>>(
		type: T,
		...control: FormControlOperatorFunction[]
	): FormReturnControlType<T, MAP>;

	/**
	 * Set One Property then Get Control and set Control Property
	 * @param property
	 * @param type
	 * @param control
	 */
	pipe<T extends FormTypeOperatorFunction<any>>(
		property: FormPropertyOperatorFunction,
		type: T,
		...control: FormControlOperatorFunction[]
	): FormReturnControlType<T, MAP>;

	/**
	 * Set Double Property then Get Control and set Control Property
	 * @param first
	 * @param second
	 * @param type
	 * @param control
	 */
	pipe<T extends FormTypeOperatorFunction<any>>(
		first: FormPropertyOperatorFunction,
		second: FormPropertyOperatorFunction,
		type: T,
		...control: FormControlOperatorFunction[]
	): FormReturnControlType<T, MAP>;

	/**
	 * Set Triple Property then Get Control and set Control Property
	 * @param first
	 * @param second
	 * @param third
	 * @param type
	 * @param control
	 */
	pipe<T extends FormTypeOperatorFunction<any>>(
		first: FormPropertyOperatorFunction,
		second: FormPropertyOperatorFunction,
		third: FormPropertyOperatorFunction,
		type: T,
		...control: FormControlOperatorFunction[]
	): FormReturnControlType<T, MAP>;

	/**
	 * Set Form Properties!
	 * @param property
	 */
	pipe(...property: FormPropertyOperatorFunction[]): this;
}