import {ComponentType} from '@angular/cdk/portal';
import {DOCUMENT} from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ComponentRef,
	ElementRef,
	Inject,
	Injector,
	Input,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef,
	ViewEncapsulation
} from '@angular/core';
import {DotComponentService, DynamicComponent, ElementMover, MixinComponent} from '@ng-dot/core';
import {withLift} from '@ng-dot/layout/lift';
import {DotLayerOption, LayerInterface} from '@ng-dot/panel';
import {DotLayerStoreService} from './dot-layer-store.service';

@Component({
	template: `
		<article>
			<header #headerRef>
				<ng-container *ngIf="option?.heading; let heading">
					<dot-pad>
						<h1 [innerHTML]="heading"></h1>
					</dot-pad>
				</ng-container>
			</header>

			<main>
				<dot-pad>
					<ng-template #viewContainerRef></ng-template>
				</dot-pad>
			</main>
		</article>
	`,
	styleUrls: ['./dot-layer.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-layer'
	},
	inputs: [
		'lift'
	]
})
export class DotLayerComponent extends MixinComponent.apply(withLift) implements OnInit, OnDestroy, DynamicComponent, LayerInterface {

	protected _node: HTMLElement;
	protected _selfMaximize = this.maximize.bind(this);
	protected _maximized: boolean;
	protected _mover: ElementMover;

	@Input() layerId: string;

	@Input() component: ComponentType<any>;

	@Input() option: DotLayerOption;

	@Input() lift = 3;

	@ViewChild('headerRef', {static: true}) headerRef: ElementRef<HTMLElement>;
	@ViewChild('viewContainerRef', {static: true, read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

	componentRef: ComponentRef<DotLayerComponent>;

	constructor(
		@Inject(DOCUMENT) protected document: Document,
		protected _component: DotComponentService,
		protected _store: DotLayerStoreService,
		injector: Injector,
	) {
		super(injector);
	}

	ngOnInit() {
		super.ngOnInit();

		this._store.opened(this);

		const {_mixedNode, headerRef} = this;

		this._mover = new ElementMover(this._injector, _mixedNode, {
			area: headerRef.nativeElement
		});

		const option = Object.assign({
			heading: null,
			top: null,
			left: null,
			width: 320,
			height: 240,
			maximize: false,
			maximizable: false,
			margin: 20,
			data: null
		}, this.option || {});

		this.option = option;

		this._component.append(
			this.viewContainerRef,
			this.component,
			{
				...this.option.data,
				layerRef: this
			}
		);

		if (option.maximizable) {
			headerRef.nativeElement.addEventListener('dblclick', this._selfMaximize);
		}

		this._render();

		if (option.maximize) {
			this.maximize();
		}
	}

	ngOnDestroy() {
		this._store.closed(this);
	}

	protected _render() {
		const {document} = this;
		let {width, height, top, right, bottom, left} = this.option;

		const {clientWidth, clientHeight} = document.documentElement;

		if (!top) {
			top = (clientHeight - +height) / 2;
		}

		if (!left) {
			left = (clientWidth - +width) / 2;
		}

		function getSize(value: number | string) {
			if (typeof value === 'number') {
				return value + 'px';
			}

			return value;
		}

		const {style} = this._mixedNode;

		if (top) {
			style.top = getSize(top);
		}

		if (left) {
			style.left = getSize(left);
		}

		style.width = getSize(width);
		style.height = getSize(height);
	}

	focus() {
		this._mixedNode.focus();

		return this;
	}

	minimize() {
		this._maximized = false;
		this._mover.enable();
		this._render();
	}

	maximize() {
		this._maximized = true;
		this._mover.disable();

		const {style} = this._mixedNode;
		const {margin} = this.option;
		style.top = margin + 'px';
		style.left = margin + 'px';
		style.right = margin + 'px';
		style.bottom = margin + 'px';
		style.width = 'auto';
		style.height = 'auto';
	}

	resize() {
		if (this._maximized) {
			this.minimize();
		} else {
			this.maximize();
		}
	}

	close() {
		this.componentRef.destroy();
		return null;
	}
}