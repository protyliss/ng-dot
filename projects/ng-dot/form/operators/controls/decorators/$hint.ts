import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control Description
 * @param value
 */
export function $hint(value: string): FormControlOperatorFunction {
	return control => {
		control.hint = value;
		return control;
	};
}