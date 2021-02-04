import {EchoBase} from '../classes/echo-base';

export class WorkerTalk extends EchoBase {
	send(data: string | ArrayBufferLike | Blob | ArrayBufferView): this {
		return this;
	}

	open(uri?: string) {
	}

	close() {
	}
}