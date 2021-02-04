import { Input, Directive } from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class HeadingComponentBase {
	@Input() iconGroup: string;
	@Input() icon: string;
	
	@Input() heading: string;
}