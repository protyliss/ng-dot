import {Directive, ElementRef} from '@angular/core';

@Directive({
	selector: '[tabAll]',
	host: {
		class: 'dot-tab-headline'
	}
})
export class TabAllDirective {
	constructor(protected elementRef: ElementRef) {
	}

	get headline() {
		return this.elementRef.nativeElement.innerHTML;
	}
}
