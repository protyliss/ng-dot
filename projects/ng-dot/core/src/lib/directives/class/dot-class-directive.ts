import {Directive, ElementRef, Input, NgModule, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {SelectorHold} from '../../extends/selector-hold';


@Directive({
	selector: '[dotClass]'
})
export class DotClassDirective implements OnInit, OnDestroy, OnChanges {
	@Input('dotClass') set fromSelector(classes) {
		this.classes = classes;
	}

	@Input() classes: Array<any> | Record<string, any>;

	protected _classes: Array<any> | Record<string, any>;

	protected _node: HTMLElement;
	protected _classList: DOMTokenList;

	// protected _classNameHolders: SelectorHold[];
	protected _subscription: Subscription;
	protected _classNameSubscription: Subscription;


	constructor(elementRef: ElementRef<any>) {
		this._node = elementRef.nativeElement;
		this._classList = this._node.classList;
	}

	ngOnInit() {
		this._render();
	}

	ngOnDestroy() {
		this._reset();
	}

	ngOnChanges(changes: SimpleChanges) {
		Object.keys(changes).forEach(key => {
			const change = changes[key];

			this[key] = change.currentValue;
			if (key === 'classes') {
				console.log('change render');
				this._render();
			}
		});
	}

	protected _reset() {
		if (this._subscription) {
			this._subscription.unsubscribe();
		}
		if (this._classNameSubscription) {
			this._classNameSubscription.unsubscribe();
		}
	}

	protected _render() {
		this._reset();

		const {classes} = this;
		if (classes instanceof Observable) {
			this._subscription = classes.subscribe(_classes => {
				this._classes = _classes;
				this._setClasses();
			});
		} else {
			this._classes = classes;
			this._setClasses();
		}
	}

	_setClasses() {
		const {_node, _classList, _classes} = this;

		const subscription = new Subscription;

		_node.className = '';

		if (!_classes) {
			return;
		}

		if (Array.isArray(_classes)) {
			let current = _classes.length;
			let target;
			while (current-- > 0) {
				target = _classes[current];

				switch (typeof target) {
					case 'string':
						_classList.add(target);
						break;
					case 'object':
						if (target instanceof Observable) {
							subscription.add((new SelectorHold(_node)).set(target));
						}
				}
			}
		} else if (typeof _classes === 'object') {
			const keys = Object.keys(_classes);
			let current = keys.length;
			let className;
			let target;
			while (current-- > 0) {
				className = keys[current];
				target = _classes[className];

				switch (typeof target) {
					case 'boolean':
					case 'string':
					case 'number':
						if (target) {
							_classList.add(className);
						}
						break;
					case 'object':
						if (target instanceof Observable) {
							const classNameHolderer = new SelectorHold(_node);
							subscription.add(
								target.subscribe(flag => {
									if (flag) {
										classNameHolderer.pop();
									} else {
										classNameHolderer.set(className);
									}
								})
							);
						}
				}
			}
		}

		if (this._classNameSubscription) {
			this._classNameSubscription.unsubscribe();
		}
		this._classNameSubscription = subscription;
	}
}

@NgModule({
    declarations: [
		DotClassDirective
    ],
    exports: [
		DotClassDirective
    ]
})
export class DotClassDirectiveModule {

}