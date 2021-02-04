import {ComponentType} from '@angular/cdk/overlay';
import {Injector} from '@angular/core';
import {ComponentStaticPool, DotComponentService, PartialNonFunctionProperties} from '@ng-dot/core';
import {DotLayerOption, LayerOperatorInterface} from '@ng-dot/panel';
import {DotLayerPoolComponent} from './dot-layer-pool.component';
import {DotLayerStoreService} from './dot-layer-store.service';
import {DotLayerComponent} from './dot-layer.component';


export class DotLayerOperator implements LayerOperatorInterface {
	protected _store: DotLayerStoreService;
	protected _pool: ComponentStaticPool<DotLayerComponent, PartialNonFunctionProperties<DotLayerComponent>>;

	constructor(injector: Injector) {
		const _component = injector.get(DotComponentService);
		this._store = injector.get(DotLayerStoreService);
		this._pool = _component.pool(
			DotLayerPoolComponent,
			DotLayerComponent
		);
	}

	open<T extends ComponentType<any>>(id: string, component: T, option?: DotLayerOption<T>): DotLayerComponent;
	open<T extends ComponentType<any>>(component: T, option?: DotLayerOption<T>): DotLayerComponent;
	open(id_or_component, component_or_option?, option?) {
		let id = id_or_component;
		let component = component_or_option;

		if (typeof id !== 'string') {
			option = component;
			component = id;
			id = null;
		}

		const {_store} = this;

		if (_store.has(id)) {
			return _store.get(id).focus();
		}

		const {maximize} = option;
		if (maximize) {
			option.maximizable = true;
		}

		const componentRef = this._pool.append({
			layerId: id,
			component,
			option
		} as any);

		return componentRef.instance;
	}

	destroy() {
		this._pool.viewContainerRef.clear();
	}
}
