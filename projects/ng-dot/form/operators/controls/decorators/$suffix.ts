import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Suffix as Display to Control Ends
 * @param value
 */
export function $suffix(value: string): FormControlOperatorFunction {
	return control => {
		control.suffix = value;
		return control;
	};
}