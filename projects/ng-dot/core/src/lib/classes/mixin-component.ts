import {Directive, ElementRef, Injector, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Constructor} from '@angular/cdk/table';

@Directive()
/**
 * Mixin Component Base
 */
// tslint:disable-next-line:directive-class-suffix
export class MixinComponent implements OnInit, OnChanges, OnDestroy {
	/**
	 * Initialized condition until mixin component
	 */
	_mixedInit: boolean;

	/**
	 * Component Container Element
	 */
	_mixedNode: HTMLElement;

	/**
	 * Components Mixin One
	 */
	static apply<T extends Constructor<MixinComponent>,
		A extends (Base: T) => T>(a: A): ReturnType<A>;
	/**
	 * Components Mixin Two
	 */
	static apply<T extends Constructor<MixinComponent>,
		A extends (Base: T) => T,
		B extends (Base: ReturnType<A>) => T>(a: A, b: B): ReturnType<B>;
	/**
	 * Components Mixin Tree
	 */
	static apply<T extends Constructor<MixinComponent>,
		A extends (Base: T) => T,
		B extends (Base: ReturnType<A>) => T,
		C extends (Base: ReturnType<B>) => T>(a: A, b: B, c: C): ReturnType<C>;
	/**
	 * Components Mixin Four
	 */
	static apply<T extends Constructor<MixinComponent>,
		A extends (Base: T) => T,
		B extends (Base: ReturnType<A>) => T,
		C extends (Base: ReturnType<B>) => T,
		D extends (Base: ReturnType<C>) => T,
		>(a: A, b: B, c: C, d: D): ReturnType<D>;
	/**
	 * Components Mixin Five
	 */
	static apply<T extends Constructor<MixinComponent>,
		A extends (Base: T) => T,
		B extends (Base: ReturnType<A>) => T,
		C extends (Base: ReturnType<B>) => T,
		D extends (Base: ReturnType<C>) => T,
		E extends (Base: ReturnType<D>) => T,
		>(a: A, b: B, c: C, d: D, e: E): ReturnType<E>;
	/**
	 * Components Mixin
	 */
	static apply(...mixins: any[]) {
		return mixins.reduce(
			// @dynamic
			(baseClass, mixin) => {
				return mixin(baseClass);
			},
			MixinComponent
		);
	}

	constructor(public _injector: Injector) {
		this._mixedNode = _injector.get(ElementRef).nativeElement;
	}

	ngOnInit() {
		this._mixedInit = true;
	}

	ngOnChanges(changes: SimpleChanges) {
	}

	ngOnDestroy() {
	}
}
