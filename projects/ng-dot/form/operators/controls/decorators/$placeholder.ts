import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control [placeholder]
 * @param value
 */
export function $placeholder(value: string): FormControlOperatorFunction {
	return control => {
		control.placeholder = value;
		return control;
	};
}