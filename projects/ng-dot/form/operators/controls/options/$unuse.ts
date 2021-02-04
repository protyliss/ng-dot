import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Unuse Condition
 * @param flag
 */
export function $unuse(flag = true): FormControlOperatorFunction{
	return control => {
		control.unuse = flag;
		control.disabled = flag;
		return control;
	};
}

$unuse['true'] = $unuse(true);
$unuse['false'] = $unuse(false);