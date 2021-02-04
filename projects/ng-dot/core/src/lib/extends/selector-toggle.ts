import {Observable, Subscription} from 'rxjs';

/**
 * ClassName Toggle
 * @example
 *   className = foo
 *   `set()` => add `foo`
 *   `pop()` => remove `foo`
 */
export class SelectorToggle {
	protected _className: string;
	protected _node: HTMLElement;

	isSet: boolean;

	constructor(_node: HTMLElement, className?: string)
	constructor(_node, className?) {
		this._node = _node;
		if (className) {
			this.setClassName(className);
		}
	}

	setClassName(className: string);
	setClassName(className) {
		this._className = className;
		return this;
	}

	set() {
		if (this.isSet) {
			return this;
		}
		this._node.classList.add(this._className);
		this.isSet = true;
		return this;
	}

	pop() {
		if (!this.isSet) {
			return this;
		}
		this._node.classList.remove(this._className);
		this.isSet = false;
		return this;
	}

	enable(flag?: boolean);
	enable(flag = true) {
		if (flag) {
			this.set();
		} else {
			this.pop();
		}
		return this;
	}

	disable(flag?: boolean);
	disable(flag = true) {
		return this.enable(!flag);
	}

	take(subject: Observable<boolean>): Subscription;
	take(subject) {
		return subject.subscribe(flag => {
			this.enable(flag);
		});
	}
}