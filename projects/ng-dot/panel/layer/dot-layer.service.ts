import {Injectable, Injector} from '@angular/core';
import {DotLayerComponent} from './dot-layer.component';
import {ComponentType} from '@angular/cdk/overlay';
import {DotLayerOption, LayerOperatorInterface} from '@ng-dot/panel';
import {DotLayerOperator} from './dot-layer-operator';

@Injectable()
export class DotLayerService implements LayerOperatorInterface {
	protected _operators: Record<string, DotLayerOperator> = {};
	protected _operator = this.group('default');

	constructor(
		protected _injector: Injector
	) {
	}

	/**
	 * Create Group of Layer for Multiple Control
	 * @param name
	 */
	group(name: string) {
		const {_operators} = this;
		let operator = _operators[name];

		if (!operator) {
			operator = new DotLayerOperator(this._injector);
		}

		return operator;
	}

	open<T extends ComponentType<any>>(id: string, component: T, option?: DotLayerOption<T>): DotLayerComponent;
	open<T extends ComponentType<any>>(component: T, option?: DotLayerOption<T>): DotLayerComponent;
	open(id_or_component, component_or_option?, option?) {
		return this._operator.open(id_or_component, component_or_option, option);
	}

	destroy() {
		this._operator.destroy();
	}
}
