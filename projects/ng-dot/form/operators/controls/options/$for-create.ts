import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Using Condition when Create
 * @param flag
 */
export function $forCreate(flag = true): FormControlOperatorFunction {
	return control => {
		control.forCreate = flag;
		control.forUpdate = !flag;
		return control;
	};
}

$forCreate['true'] = $forCreate(true);
$forCreate['false'] = $forCreate(false);