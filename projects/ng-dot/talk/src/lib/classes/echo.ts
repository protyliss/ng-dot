import {checkSubscription, ProxySubject} from '@ng-dot/core';
import {Subscription} from 'rxjs';
import {EchoBase} from './echo-base';
import {Listen} from './listen';

export class Echo<T = any> extends Listen<T> {
	protected _source: Listen<T>;
	protected _sourceSubscription: Subscription;
	protected _dataset: any;
	protected _requested: boolean;

	constructor(
		community: EchoBase,
		type: string,
		dataset: any,
		source: Listen
	) {
		super(
			community,
			type
		);

		this._dataset = dataset;
		this._source = source;
	}

	protected _getProxySubject(subject) {
		return new Echoed(this, subject);
	}

	onSubscribe() {
		super.onSubscribe();
		this.request();
	}

	onUnsubscribe() {
		super.onUnsubscribe();
		this._sourceSubscription = checkSubscription(this._sourceSubscription);
	}

	request() {
		if (this._requested) {
			return;
		}

		this._requested = true;

		if (!this._sourceSubscription) {
			this._sourceSubscription = this._source.subscribe(
				response => {
					this.next(response);
					this.complete();
					this._requested = false;
				}
			);
		}

		(this._community as EchoBase).send(
			JSON.stringify(
				{
					type: this.type,
					dataset: this._dataset
				}
			)
		);
	}
}

export class Echoed<T> extends ProxySubject<T> {
	protected _echo: Echo;

	get type() {
		return this._echo.type;
	}

	constructor(
		echo: Echo,
		subject
	) {
		super(subject);
		this._echo = echo;
	}

	protected _getProxySubject(subject) {
		return new Echoed(this._echo, subject);
	}

	onSubscribe() {
		this._echo.request();
	}
}