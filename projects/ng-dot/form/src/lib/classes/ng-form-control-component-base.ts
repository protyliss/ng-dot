import {Directive, Input} from '@angular/core';
import {FormControlComponentBase} from './form-control-component-base';
import {NgFormControl} from './ng-form-control';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class NgFormControlComponentBase extends FormControlComponentBase {
	@Input() control: NgFormControl;
}