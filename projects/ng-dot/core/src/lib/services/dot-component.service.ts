import {DOCUMENT} from '@angular/common';
import {
	ApplicationRef,
	ComponentFactoryResolver,
	ComponentRef,
	Inject,
	Injectable,
	Injector,
	ViewContainerRef
} from '@angular/core';
import {
	Constructor,
	DynamicComponent,
	DynamicComponentMarker,
	PartialNonFunctionProperties,
	PartialProperties
} from '../interfaces';
import {ComponentType} from '@angular/cdk/overlay';

@Injectable({
	providedIn: 'root'
})
export class DotComponentService {
	constructor(
		protected factoryResolver: ComponentFactoryResolver,
		protected injector: Injector,
		@Inject(DOCUMENT) protected document,
		protected _appRef: ApplicationRef
	) {
	}

	/**
	 * appendStyleComponent component add to viewContainerRef
	 * @param viewContainerRef
	 * @param component
	 * @param data
	 */
	append<T extends DynamicComponent, V = PartialNonFunctionProperties<T>>(viewContainerRef: ViewContainerRef,
																			component: Constructor<T>,
																			data?: V): ComponentRef<T>;

	/**
	 * appendStyleComponent component add to document.body
	 * @param component
	 * @param data
	 */
	append<T extends DynamicComponent, V = PartialNonFunctionProperties<T>>(component: Constructor<T>, data?: V): ComponentRef<T>;


	/**
	 * appendStyleComponent component
	 * @param viewContainerRef
	 * @param component
	 * @param data
	 */
	append(viewContainerRef, component?, data?): ComponentRef<any> {
		if (!component) {
			component = viewContainerRef;
			viewContainerRef = null;
		}

		const factory = this.factoryResolver.resolveComponentFactory(component);

		let componentRef: ComponentRef<any>;

		if (viewContainerRef) {
			componentRef = viewContainerRef.createComponent(factory, undefined, this.injector);
			
		} else {
			componentRef = factory.create(this.injector);
			this.document.body.appendChild(componentRef.location.nativeElement);
			this._appRef.attachView(componentRef.hostView);
		}

		const {instance, changeDetectorRef} = componentRef;

		instance.componentRef = componentRef;
		
		if (data) {
			function setData(key) {
				instance[key] = data[key];
			}

			Object.keys(data).map(setData);
			changeDetectorRef.detectChanges();
		} else {
			changeDetectorRef.markForCheck();
		}

		return componentRef;
	}

	/**
	 * get instance from component added to viewContainerRef
	 * @param viewContainerRef
	 * @param component
	 * @param data
	 */
	instance<T extends DynamicComponent, V = PartialNonFunctionProperties<T>>(viewContainerRef: ViewContainerRef, component: Constructor<T>, data?: V): T;

	/**
	 * get instance from component added to document.body
	 * @param component
	 * @param data
	 */
	instance<T, V = PartialNonFunctionProperties<T>>(component: Constructor<T>, data?: V): T;

	/**
	 * get instance
	 * @param viewContainerRef
	 * @param component
	 * @param data
	 */
	instance(viewContainerRef, component?, data?): any {
		const componentRef = this.append(viewContainerRef, component);
		return componentRef.instance;
	}


	pool(viewContainerRef): ComponentPool;

	/**
	 * create component pool as self sugar
	 * @param viewContainerRef
	 * @param component
	 */
	pool<T extends DynamicComponent, V = PartialNonFunctionProperties<T>>(viewContainerRef, component: ComponentType<T>): ComponentStaticPool<T, V>;
	pool(viewContainerRef, component?) {
		// DynamicComponentPool
		if (typeof viewContainerRef === 'function') {
			viewContainerRef =
				(<DynamicComponentMarker>this.instance(viewContainerRef)).viewContainerRef;
			// DynamicComponentPool.instance
		} else if (typeof viewContainerRef === 'object'
			&& viewContainerRef['viewContainerRef']
			&& viewContainerRef['componentRef']
		) {
			viewContainerRef = viewContainerRef.viewContainerRef;
		}
		return component ?
			new ComponentStaticPool(this, viewContainerRef, component) :
			new ComponentPool(this, viewContainerRef);
	}
}

export class ComponentStaticPool<T extends DynamicComponent, V = PartialProperties<T>> {
	constructor(
		protected _component: DotComponentService,
		public viewContainerRef: ViewContainerRef,
		protected component: any
	) {

	}

	append(data ?: V): ComponentRef<T> {
		return this._component.append(
			this.viewContainerRef,
			this.component,
			data
		);
	}
}

export class ComponentPool {
	constructor(
		protected _component: DotComponentService,
		protected viewContainerRef: ViewContainerRef
	) {
	}

	append<T extends DynamicComponent, V = PartialNonFunctionProperties<T>>(component: T, data?: V) {
		return this._component.append(
			this.viewContainerRef,
			component as any,
			data);
	}
}

export function destroy(controls: ComponentRef<DynamicComponent>[]) {
	return controls.forEach(destroyMap);
}

export function destroyMap(control: ComponentRef<DynamicComponent>) {
	control.destroy();
}
