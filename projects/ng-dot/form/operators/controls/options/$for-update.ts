import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Using Condition when Update
 * @param flag
 */
export function $forUpdate(flag = true): FormControlOperatorFunction {
	return control => {
		control.forCreate = !flag;
		control.forUpdate = flag;
		return control;
	};
}

$forUpdate['true'] = $forUpdate(true);
$forUpdate['false'] = $forUpdate(false);