import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control [onchange]
 * @param callback
 */
export function $change(callback: Function): FormControlOperatorFunction {
	return control => {
		return control.setEvent('change', callback);
	};
}