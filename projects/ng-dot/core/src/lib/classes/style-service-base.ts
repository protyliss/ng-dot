import {ComponentFactoryResolver, Directive, Injector} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class StyleServiceBase {
	constructor(
		protected injector: Injector,
		protected component: any,
	) {
		this.appendStyleComponent();
	}

	protected appendStyleComponent() {
		this.appendStyleComponent = () => {
		};

		const document = this.injector.get(DOCUMENT);
		const componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
		const componentRef = componentFactoryResolver
			.resolveComponentFactory(this.component)
			.create(this.injector);

		document.body.appendChild(componentRef.location.nativeElement);
	}
}
