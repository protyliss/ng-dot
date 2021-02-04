import {Observable, Subscription} from 'rxjs';

export interface SelectorHoldOption {
	prefix?: string;
}

/**
 * ClassName control for One of ClassName Group like Types
 * @example
 *  prefix = group
 *  `.set(foo)` => add `group_foo`
 *  `.set(bar)` => add `group_bar`, remove `group_foo`
 */
export class SelectorHold<CLASSNAME extends string = string> {
	protected _lastClassName;
	protected _node: HTMLElement;

	protected _prefix: string;

	constructor(node: Element, options?: SelectorHoldOption)
	constructor(node, options?) {
		this._node = node;

		if (!options) {
			return;
		}
		this._prefix = options.prefix;
	}

	setPrefix(prefix: string) {
		this._prefix = prefix;
		return this;
	}


	set(observable: Observable<CLASSNAME>): Subscription;
	set(className: CLASSNAME);
	set(observable_or_className) {
		switch (typeof observable_or_className) {
			case 'number':
			case 'string':
				return this._set(observable_or_className as string);
			default:
				if (observable_or_className instanceof Observable) {
					return observable_or_className.subscribe(className => {
						this._set(className);
					});
				}
		}
	}

	protected _set(className: string);
	protected _set(className) {
		if (this._prefix) {
			className = this._prefix + className as CLASSNAME;
		}

		if (this._lastClassName === className) {
			return;
		}

		this.pop();
		this._lastClassName = className;
		this._node.classList.add(className);
		return this;
	}

	pop() {
		if (!this._lastClassName) {
			return;
		}
		this._node.classList.remove(this._lastClassName);
	}
}
