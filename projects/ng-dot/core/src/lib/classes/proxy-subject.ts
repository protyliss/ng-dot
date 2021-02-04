import {Observable, OperatorFunction, PartialObserver, Subject, Subscription, SubscriptionLike} from 'rxjs';

export abstract class ProxySubject<T = any> extends Observable<T> implements SubscriptionLike {

	protected _subject: Subject<T>;

	_proxySubscribed = 0;

	get isStopped() {
		return this._subject.isStopped;
	}

	get hasError() {
		return this._subject.hasError;
	}

	get observers() {
		return this._subject.observers;
	}

	get thrownError() {
		return this._subject.thrownError;
	}

	get closed() {
		return this._subject.closed;
	}

	constructor(subject?: Subject<any>) {
		super();
		this._subject = subject || new Subject();
	}

	protected _getProxySubject(subject: Observable<any>) {
		const Proxy = this.constructor as new(...args: any) => any;
		return new Proxy(subject);
	}

	public onSubscribe() {
	}

	public onUnsubscribe() {
	}

	public onFirstSubscribe() {
	}

	public onLastUnsubscribe() {
	}

	next(value: T) {
		this._subject.next(value);
	}

	error(err: any) {
		this._subject.error(err);
	}

	complete() {
		const {isStopped} = this;
		if (!isStopped) {
			this._subject.complete();
			this.onLastUnsubscribe();
		}
	}

	pipe(): Observable<T>;
	pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
	pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): Observable<B>;
	pipe<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): Observable<C>;
	pipe<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): Observable<D>;
	pipe<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): Observable<E>;
	pipe<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): Observable<F>;
	pipe<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): Observable<G>;
	pipe<A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): Observable<H>;
	pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): Observable<I>;
	pipe<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): Observable<{}>;
	pipe(...pipes) {
		const {_subject} = this;
		return this._getProxySubject(
			_subject.pipe.apply(_subject, pipes)
		);
	}

	subscribe(observer?: PartialObserver<T>): Subscription;
	subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
	subscribe(observerOrNext?: PartialObserver<T> | ((value: T) => void),
			  error?: (error: any) => void,
			  complete?: () => void): Subscription {

		if (++this._proxySubscribed === 1) {
			this.onFirstSubscribe();
		}

		this.onSubscribe();

		const {_subject} = this;
		const subscription = _subject.subscribe.apply(_subject, arguments);
		const {unsubscribe} = subscription;

		subscription.unsubscribe = () => {
			this.onUnsubscribe();
			return unsubscribe.call(subscription);
		};

		return subscription;
	}

	unsubscribe() {
		this.onUnsubscribe();
		if (--this._proxySubscribed === 0) {
			this.onLastUnsubscribe();
		}
		return this._subject.unsubscribe();
	}

	toPromise() {
		return this._subject.toPromise();
	}

	asObservable() {
		return this._subject.asObservable();
	}
}