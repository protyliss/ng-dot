import {Observable, Subscription} from 'rxjs';

export abstract class TalkBase<OPERATOR, TYPES extends string = string> {

	protected talk: OPERATOR;
	protected _talk: OPERATOR;

	constructor(uri?: string) {
		this.talk = new (this._talkGetOperator() as any)(this, uri);
		this._talk = this.talk;
	}

	protected abstract _talkGetOperator(): OPERATOR | (new(...args: any[]) => OPERATOR);

	subscribe(...names: TYPES[]) {
		let current = names.length;
		const subscription = new Subscription();
		while (current-- > 0) {
			subscription.add(
				(this[names[current] as string] as Observable<any>).subscribe()
			);
		}

		return subscription;
	}
}