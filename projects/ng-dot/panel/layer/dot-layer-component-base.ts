import {ComponentRef, Directive, Input} from '@angular/core';
import {DynamicComponent} from '@ng-dot/core';
import {LayerInterface} from '@ng-dot/panel';
import {DotLayerComponent} from './dot-layer.component';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class DotLayerComponentBase implements DynamicComponent, LayerInterface {
	componentRef: ComponentRef<DotLayerComponentBase>;
	@Input() layerRef: DotLayerComponent;

	minimize() {
		this.layerRef.minimize();
	}

	maximize() {
		this.layerRef.maximize();
	}

	resize() {
		this.layerRef.resize();
	}

	focus() {
		return this;
	}

	close() {
		this.layerRef.close();
	}
}
