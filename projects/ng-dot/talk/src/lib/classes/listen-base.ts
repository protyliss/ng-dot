import {share} from 'rxjs/operators';
import {TalkBase} from './talk-base';
import {Subject} from 'rxjs';
import {Listen} from './listen';

export abstract class ListenBase<TYPES extends string = string> {
	protected talk: TalkBase<ListenBase>;

	protected _selfOnOpen = this._onOpen.bind(this);
	protected _selfOnClose = this._onClose.bind(this);
	protected _selfOnError = this._onError.bind(this);
	protected _selfClose = this.close.bind(this);

	protected uri: string;

	protected _opened: boolean;

	protected _used = 0;
	protected _closeTimer: number;

	opened$ = new Subject;
	closed$ = new Subject;
	errored$ = new Subject;

	_listenMap: { [type: string]: Listen } = {};

	protected constructor(talk: TalkBase<ListenBase>, uri?: string) {
		this.talk = talk;
		this.uri = uri;
	}

	abstract open(uri?: string);

	abstract close();

	protected _onOpen() {
		this._opened = true;
		this.opened$.next();
	}

	protected _onError() {
		this.closed$.next();
	}

	protected _onClose(event: Event) {
		this._opened = false;
		this.errored$.next();
	}

	listen<RESPONSE>(type: TYPES): Listen<RESPONSE>;
	listen(type) {
		const {_listenMap: map} = this;
		
		if (map[type]) {
			throw ReferenceError(`From type '${type}' is already declared`);
		}
		
		const talker = new Listen(this, type);
		map[type] = talker;
		return talker;
	}

	subscribed() {
		this._used++;
		if (this._used > 1) {
			return;
		}

		if (this._closeTimer) {
			clearTimeout(this._closeTimer);
		}

		this.open(this.uri);
	}

	unsubscribed() {
		this._used--;

		if (1 > this._used && this._opened) {
			this._closeTimer = setTimeout(this._selfClose, 3000);
		}
	}
}