import {ComponentRef, Injectable} from '@angular/core';
import {DotComponentService, DotThemeColor} from '@ng-dot/core';
import {ToastOperatorInterface} from '@ng-dot/notify';
import {DotToastPoolComponent} from './dot-toast-pool.component';
import {DotToastComponent} from './dot-toast.component';

export interface DotToastOption {
	color?: DotThemeColor;
}

@Injectable({
	providedIn: 'root'
})
export class DotToastService implements ToastOperatorInterface {
	protected _pool = this._component.pool(DotToastPoolComponent, DotToastComponent);
	protected _identifiedToasts: Record<string, ComponentRef<DotToastComponent>> = {};

	constructor(
		protected _component: DotComponentService
	) {
	}

	protected _make(body: string, option?: DotToastOption): DotToastComponent;
	protected _make(id: string, body: string, option: DotToastOption): DotToastComponent;
	protected _make(id_or_body, body_or_color?, option?) {
		let id = id_or_body;
		let body = body_or_color;
		option = option || {};

		switch (arguments.length) {
			case 2:
				if (typeof body === 'object') {
					option = body;
					body = id;
					id = null;
				}
				break;
			case 1:
				body = id;
				id = null;
		}

		const componentRef = this._pool.append({
			operator: this,
			body,
			id,
			color: option.color
		});

		if (id) {
			const {_identifiedToasts} = this;
			const previousComponentRef = _identifiedToasts[id];
			if (previousComponentRef) {
				previousComponentRef.instance.confirm();
			}
			_identifiedToasts[id] = componentRef;
		}

		return componentRef.instance;
	}

	normal(id_or_body: string, body?: string) {
		return this._make(id_or_body, body, null);
	}

	primary(id_or_body: string, body?: string) {
		return this._make.apply(this, [...arguments, {color: 'primary'}]);
	}

	accent(id_or_body: string, body?: string) {
		return this._make.apply(this, [...arguments, {color: 'accent'}]);
	}

	warn(id_or_body: string, body?: string) {
		return this._make.apply(this, [...arguments, {color: 'warn'}]);
	}

	confirmed(component: DotToastComponent) {
		const {id} = component;
		const {_identifiedToasts} = this;

		if (_identifiedToasts[id]) {
			delete _identifiedToasts[id];
		}
	}

	confirm(...ids: string[]) {
		const {_identifiedToasts} = this;
		let current = ids.length;
		while (current-- > 0) {
			const id = ids[current];
			const componentRef = _identifiedToasts[id];
			if (componentRef) {
				componentRef.instance.confirm();
			}
		}
	}
}