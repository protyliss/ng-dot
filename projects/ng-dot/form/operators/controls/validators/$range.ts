import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control [min], [max]
 * @param min_or_range
 * @param max
 */
export function $range(min_or_range: number | [number, number?], max?: number): FormControlOperatorFunction {
	let min = min_or_range;
	if (Array.isArray(min)) {
		max = min[1];
		min = min[0];
	}
	if (!max) {
		max = min;
		min = 0;
	}

	return control => {
		control.min = min as number;
		control.max = max;
		return control;
	};
}