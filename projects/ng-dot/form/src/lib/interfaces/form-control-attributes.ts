import {FormControlType} from './form-control-type';

export interface FormControlAttributes<T = string> {
	type: FormControlType;
	name: string;
	value: T;
	
	// pure validators
	required: boolean;
	min: number;
	max: number;
	minLength: number;
	maxLength: number;
	pattern: string;
}