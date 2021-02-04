export type FormControlAssistType =
	| 'tel'
	| 'email'
	| 'url'
	| 'ip4';

export type FormControlAssistPattern = [RegExp, string];

export interface FormControlAssistConfigure {
	add: FormControlAssistPattern[];
	remove: FormControlAssistPattern[];
}