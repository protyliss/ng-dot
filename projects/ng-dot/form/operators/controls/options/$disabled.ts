import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control [disabled]
 * @param flag
 */
export function $disabled(flag = true): FormControlOperatorFunction{
	return control => {
		control.disabled = flag;
		return control;
	};
}

$disabled['true'] = $disabled(true);
$disabled['false'] = $disabled(false);