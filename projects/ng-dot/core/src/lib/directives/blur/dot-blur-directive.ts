import {Directive, ElementRef, HostListener, NgModule} from '@angular/core';

@Directive({
	selector: '[dotBlur]'
})
export class DotBlurDirective {
	protected _node: HTMLElement;

	constructor(elementRef: ElementRef<HTMLElement>) {
		this._node = elementRef.nativeElement;
	}

	@HostListener('focus')
	onFocus() {
		this._node.blur();
	}
}

@NgModule({
    declarations: [
		DotBlurDirective
    ],
    exports: [
		DotBlurDirective
    ]
})
export class DotBlurDirectiveModule {

}