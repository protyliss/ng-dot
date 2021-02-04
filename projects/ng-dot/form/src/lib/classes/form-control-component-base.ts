import {AfterViewInit, Directive, ElementRef, Input, ViewChild} from '@angular/core';
import {FormControlInterface} from '../interfaces/form-control-interface';
import {FormInterface} from '../interfaces/form-interface';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class FormControlComponentBase implements AfterViewInit {
	@Input() form: FormInterface;
	@Input() control: FormControlInterface;
	
	@ViewChild('controlRef', {static: false}) controlRef: ElementRef<HTMLElement>;
	
	ngAfterViewInit() {
		this.control.setNode(this.controlRef.nativeElement);
	}
}