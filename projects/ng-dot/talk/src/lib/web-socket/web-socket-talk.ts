import {EchoBase} from '../classes/echo-base';

export class WebSocketTalk extends EchoBase {
	protected _webSocket: WebSocket;

	open(uri) {
		if (this._opened) {
			return;
		}
		
		uri = uri || this.uri;
		
		const webSocket = new WebSocket(uri);

		this._webSocket = webSocket;

		webSocket.onopen = this._selfOnOpen;

		webSocket.onclose = this._selfOnClose;

		webSocket.onerror = this._selfOnError;

		webSocket.onmessage = (event: MessageEvent) => {
			const data = JSON.parse(event.data);
			const {type, dataset} = data;

			if (!type) {
				console.warn('Invalid Message without Type', data);
			}

			if (!dataset) {
				console.warn('Invalid Message without Type', data);
			}

			const {_listenMap} = this;
			const talk = _listenMap[type];
			if (!talk) {
				return;
			}

			talk.next(dataset);
		};

	}

	close() {
		this._webSocket.close();
	}

	send(data: string | ArrayBufferLike | Blob | ArrayBufferView): this {
		if (!this._webSocket || this._webSocket.readyState !== 1) {
			this._delayedSendData.push(data);
			return this;
		}

		this._webSocket.send(data);

		return this;
	}
}
