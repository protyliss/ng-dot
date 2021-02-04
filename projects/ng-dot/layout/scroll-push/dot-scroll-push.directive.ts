import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {DotScrollEventService} from '@ng-dot/core';
import {Subscription} from 'rxjs';

@Directive({
	selector: '[dotScrollPush]'
})
export class DotScrollPushDirective implements OnInit, OnDestroy {

	@Input() property: 'margin' | 'padding' | 'left' | 'transform' = 'transform';

	@Input() whenNotScrolled: boolean;

	protected _node: HTMLElement;
	protected _subscription: Subscription;

	constructor(
		protected _scrollEvent: DotScrollEventService,
		elementRef: ElementRef
	) {
		this._node = elementRef.nativeElement;
	}

	ngOnInit(): void {
		const {_node, property} = this;


		const xProperty = property === 'margin' || property === 'padding' ?
			property + 'Left' :
			property;


		this._subscription = this._scrollEvent.position$
			.subscribe(position => {
				const {x, y} = position;

				_node.style[xProperty] = this.whenNotScrolled && y ?
					'inherit' :
					xProperty === 'transform' ?
						`translateX(${x}px)` :
						x + 'px';
			});
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
