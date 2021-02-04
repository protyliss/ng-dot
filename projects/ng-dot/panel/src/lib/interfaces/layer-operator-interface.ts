import {ComponentType} from '@angular/cdk/overlay';
import {LayerInterface} from './layer-interface';
import {DotLayerOption} from './layer-option';

export interface LayerOperatorInterface {

	/**
	 * Open Layer
	 * @param component
	 * @param option
	 */
	open<T extends ComponentType<any>>(component: T, option: DotLayerOption<T>): LayerInterface;

	/**
	 * Close All Layers
	 */
	destroy();
}
