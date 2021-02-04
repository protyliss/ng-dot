import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control [minlength]
 * @param value
 */
export function $minLength(value: number): FormControlOperatorFunction {
	return control => {
		control.minLength = value;
		return control;
	};
}