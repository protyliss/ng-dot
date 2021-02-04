import {Injectable} from '@angular/core';

import {DotLayerComponent} from './dot-layer.component';

@Injectable()
export class DotLayerStoreService {

	protected _layers: Record<string, DotLayerComponent> = {};

	has(id: string) {
		return !!this._layers[id];
	}

	get(id: string) {
		return this._layers[id];
	}

	opened(layer: DotLayerComponent) {
		this._layers[layer.layerId] = layer;
	}

	closed(layer: DotLayerComponent) {
		delete this._layers[layer.layerId];
	}
}
