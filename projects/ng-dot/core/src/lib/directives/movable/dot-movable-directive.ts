import {Directive, ElementRef, NgModule} from '@angular/core';
import {DotMoveService} from '../../services/dot-move.service';

@Directive({
	selector: '[dotMovable]'
})
export class MovableDirective {
	constructor(elementRef: ElementRef,
				_move: DotMoveService) {
		_move.active(elementRef);
	}
}

@NgModule({
  declarations: [
	  MovableDirective
  ],
  exports: [
	  MovableDirective
  ]
})
export class DotMovableDirectiveModule {
}
