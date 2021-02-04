import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set [required=false]
 * @param flag
 */
export function $optional(flag = true): FormControlOperatorFunction{
	return control => {
		control.required = !flag;
		return control;
	};
}

$optional['true'] = $optional(true);
$optional['false'] = $optional(false);