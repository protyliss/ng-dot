import {FormControlAssistConfigure} from '@ng-dot/form';

export const ip4Map: FormControlAssistConfigure = {
	add: [
		// 0 => 0.
		[/^(((\d{1,3}\.){1,2})?0)$/, '$1.'],
		// 123 => 123.
		[/^(((\d{1,3}\.){1,2})?\d{3})$/, '$1.'],
	],
	remove: null
}