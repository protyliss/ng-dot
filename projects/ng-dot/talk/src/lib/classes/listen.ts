import {ProxySubject} from '@ng-dot/core';
import {Observable} from 'rxjs';
import {EchoBase} from './echo-base';
import {ListenBase} from './listen-base';

export class Listen<T = any> extends ProxySubject<T> {
	protected _community: ListenBase | EchoBase;

	type: string;

	constructor(
		community: ListenBase | EchoBase,
		type: string,
		subject?
	) {
		super(subject);

		this.type = type;
		this._community = community;
	}
	
	protected _getProxySubject(subject: Observable<any>): any {
		return new Listen(this._community, this.type, subject);
	}

	public onSubscribe() {
		this._community.subscribed();
	}

	public onUnsubscribe() {
		this._community.unsubscribed();
	}
}