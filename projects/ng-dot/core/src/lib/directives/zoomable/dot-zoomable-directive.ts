import {Directive, ElementRef, Input, NgModule} from '@angular/core';
import {fromEvent} from 'rxjs';

@Directive({
	selector: '[dotZoomable]'
})
export class DotZoomableDirective {
	constructor(elementRef: ElementRef) {
		this._node = elementRef.nativeElement;

		this._setEvent();
	}

	protected _node: HTMLElement;

	@Input() zoom: number = 1;

	protected _setEvent() {

		const {_node} = this;
		fromEvent(_node, 'mousewheel')
			.subscribe((event: WheelEvent) => {
				console.log(event.deltaY);
			});

	}
}


@NgModule({
	declarations: [
		DotZoomableDirective
	],
	exports: [
		DotZoomableDirective
	]
})
export class DotZoomableDirectiveModule {

}
