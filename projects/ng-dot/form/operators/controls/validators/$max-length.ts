import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control [maxlength]
 * @param value
 */
export function $maxLength(value: number): FormControlOperatorFunction {
	return control => {
		control.maxLength = value;
		return control;
	};
}