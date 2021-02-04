import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control [required]
 * @param flag
 */
export function $required(flag = true): FormControlOperatorFunction {
	return control => {
		control.required = flag;
		return control;
	};
}

$required['true'] = $required(true);
$required['false'] = $required(false);