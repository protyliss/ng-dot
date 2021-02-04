import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Injector,
	Input,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {DotFloatPosition, DynamicComponentMarkerBase} from '@ng-dot/core';
import {DotToastStoreService} from './dot-toast-store.service';

@Component({
	template: `
		<span #pool></span>
	`,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-toast-pool dot-toast_bottom-center'
	}
})
export class DotToastPoolComponent extends DynamicComponentMarkerBase implements OnInit {
	protected classList: DOMTokenList;

	@Input() position: DotFloatPosition;

	constructor(
		protected _store: DotToastStoreService,
		protected _injector: Injector,
		elementRef: ElementRef<HTMLElement>
	) {
		super();

		this.classList = elementRef.nativeElement.classList;
	}

	ngOnInit() {
		const {position: globalPosition} = this._store.configure;

		const position = this.position || globalPosition;

		const prefix = 'dot-toast_';
		const positionState = prefix + position;
		this.classList.add(
			positionState
		);
	}
}