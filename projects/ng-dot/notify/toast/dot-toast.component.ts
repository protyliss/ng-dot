import {
	ChangeDetectionStrategy,
	Component,
	ComponentRef, ElementRef,
	HostListener,
	Input,
	OnDestroy,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import {DotThemeColor, DynamicComponent} from '@ng-dot/core';
import {Toast, ToastOperatorInterface} from '@ng-dot/notify';

@Component({
	template: `
		<div class="dot-toast" [dotTrans]="trans" dotLift="3-4"
			 [class]="'_'+color"
		>
			<dot-pad>
				<p class="dot-toast-body" [innerHTML]="body | nonKr"></p>
				<div class="buttons">
					<button class="dot-toast-link"
							(click)="confirm()"
					>Confirm
					</button>
				</div>
			</dot-pad>
		</div>
	`,
	styleUrls: ['./dot-toast.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * @todo
 *   - using mixin
 *     - color
 *     - trans
 *     - lift
 *     - container up to self
 */
export class DotToastComponent implements DynamicComponent, Toast, OnInit, OnDestroy {
	protected _node: HTMLElement;
	protected _autoConfirmTimer;

	@Input() operator: ToastOperatorInterface;

	@Input() id: string;

	@Input() body: string;

	@Input() trans = 'fade-bottom';

	@Input() color: DotThemeColor;

	@Input() timeout = 8000;

	componentRef: ComponentRef<DotToastComponent>;

	constructor(elementRef: ElementRef<HTMLElement>) {
		this._node = elementRef.nativeElement;
	}

	ngOnInit(): void {
		this._setTimer();
	}

	ngOnDestroy(): void {
		this._onMouseEnter();
	}

	@HostListener('mouseenter')
	private _onMouseEnter() {
		if (this._autoConfirmTimer) {
			clearTimeout(this._autoConfirmTimer);
		}
	}

	@HostListener('mouseleave')
	protected _onMouseLeave() {
		this._setTimer();
	}

	protected _setTimer() {
		this._autoConfirmTimer = setTimeout(
			() => {
				this.confirm();
			},
			this.timeout
		);
	}

	confirm() {
		if (this.operator) {
			this.operator.confirmed(this);
		}
		
		// Fixed - angular has delay with routing
		this._node.style.display = 'none';
		
		this.componentRef.destroy();
	}
}
