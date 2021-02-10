import {FormControlAssistConfigure} from './interfaces';

export const urlMap: FormControlAssistConfigure = {
	add: [
		// : => ://
		[/^([^:]*):$/, '$1://'],
		// /// => //
		[/^([^\/]*):\/{2,}$/, '$1//']
	],
	remove: null
}
