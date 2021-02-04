import {ElementRef} from '@angular/core';

export class ComponentSelectorToggle {
	protected _classList: DOMTokenList;
	protected _selector: string;

	static from(elementRef: ElementRef<any>, selector: string) {
		return new ComponentSelectorToggle(elementRef, selector);
	}

	constructor(elementRef: ElementRef, selector: string) {
		this._classList = elementRef.nativeElement.classList;
		this._selector = selector;
	}

	set() {
		this._classList.add(this._selector);
	}

	pop() {
		this._classList.remove(this._selector);
	}
}