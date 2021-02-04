import {FormControlAssistConfigure} from '@ng-dot/form';

export const urlMap: FormControlAssistConfigure = {
	add: [
		// : => ://
		[/^([^:]*):$/, '$1://'],
		// /// => //
		[/^([^\/]*):\/{2,}$/, '$1//']
	],
	remove: null
}