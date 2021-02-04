import {FormControlOperatorFunction} from '@ng-dot/form';

/**
 * Set Control [pattern]
 * @param pattern
 */
export function $pattern(pattern: string | RegExp): FormControlOperatorFunction {
	if (pattern instanceof RegExp) {
		pattern = pattern.toString();
		pattern = pattern
			.substring(1, pattern.length - 1);
	}

	return control => {
		control.pattern = pattern as string;
		return control;
	};
}