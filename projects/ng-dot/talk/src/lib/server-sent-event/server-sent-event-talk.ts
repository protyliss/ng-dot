import {ListenBase} from '../classes/listen-base';
import {Listen} from '../classes/listen';

export class ServerSentEventTalk<TYPES extends string = string> extends ListenBase<TYPES> {
	protected _talkEventSource: EventSource;
	protected _delayedAddType: TYPES[] = [];

	protected _addType(type: TYPES) {
		if (!this._opened) {
			this._delayedAddType.push(type);
			return;
		}

		const {_listenMap} = this;
		this._talkEventSource.addEventListener(type, (event: MessageEvent) => {
			const talk = _listenMap[type];
			if (!talk) {
				return;
			}
			const dataset = JSON.parse(event.data);
			talk.next(dataset);
		});
	}

	open(uri?: string) {

		uri = uri || this.uri;

		const eventSource = new EventSource(uri, {
			withCredentials: true
		});

		this._talkEventSource = eventSource;
		eventSource.onopen = this._selfOnOpen;
		eventSource.onerror = this._selfOnError;
	}

	protected _onOpen() {
		super._onOpen();
		const {_delayedAddType} = this;
		const end = _delayedAddType.length;
		let current = -1;
		while (++current < end) {
			this._addType(_delayedAddType[current]);
		}
		this._delayedAddType = [];
	}

	close() {
		this._talkEventSource.close();
	}

	/**
	 * Set onMessage
	 * @param type
	 */
	listen<RESPONSE>(type: TYPES): Listen<RESPONSE>;
	listen(type) {
		this._addType(type);
		return super.listen(type);
	}
}