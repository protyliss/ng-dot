import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Use Condition
 * @param flag
 */
export function $use(flag = true): FormControlOperatorFunction {
	return control => {
		control.unuse = !flag;
		control.disabled = !flag;
		return control;
	};
}

$use['true'] = $use(true);
$use['false'] = $use(false);