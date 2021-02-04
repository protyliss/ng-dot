import {DotFormControl} from '../classes/dot-form-control';
import {FormInputControl} from '../controls/form-input-control';
import {FormSelectControl} from '../controls/form-select-control';
import {FormTextareaControl} from '../controls/form-textarea-control';
import {FormControlInterface} from './form-control-interface';

export type FormControlInputStringType =
	| 'color'
	| 'date'
	| 'datetime-local'
	| 'email'
	| 'month'
	| 'password'
	| 'search'
	| 'tel'
	| 'text'
	| 'url'
	| 'week'
	| 'file'
	| 'hidden'
	| 'checkbox';

export type FormControlInputNumberType =
	| 'number'
	| 'range';

export type FormControlInputType =
	| FormControlInputStringType
	| FormControlInputNumberType;

export type FormControlElementType =
	| 'select'
	| 'textarea';

export type FormCustomElementType = 
	| 'custom';

export type FormControlType =
	| FormControlInputType
	| FormControlElementType
	| FormCustomElementType;

export type FormControlMapBase<BASE = FormControlInterface> = {
	[KEY in FormControlType]: BASE;
};

export interface FormControlMap extends FormControlMapBase<DotFormControl> {
	text: FormInputControl;
	select: FormSelectControl;
	textarea: FormTextareaControl;
}