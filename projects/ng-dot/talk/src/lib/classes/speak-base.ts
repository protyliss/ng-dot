import {ListenBase} from './listen-base';
import {SpeakFactory} from './speak-factory';

export abstract class SpeakBase<TYPES extends string = string> extends ListenBase<TYPES> {
	_speakFactoryMap: { [type: string]: SpeakFactory } = {};

	protected _delayedSendData = [];

	protected _onOpen() {
		super._onOpen();

		const {_delayedSendData} = this;
		const end = _delayedSendData.length;
		let current = -1;
		while (++current < end) {
			this.send(_delayedSendData[current]);
		}

		this._delayedSendData = [];
	}

	abstract send(data: string | ArrayBufferLike | Blob | ArrayBufferView): this;

	/**
	 * Set PostMessage
	 * @param type
	 */
	speak<REQUEST>(type: TYPES): SpeakFactory<REQUEST>;
	speak(type) {
		const {_speakFactoryMap} = this;
		if (_speakFactoryMap[type]) {
			throw ReferenceError(`Speak '${type}' is already declared`);
		}

		const leader = new SpeakFactory(this, type);
		_speakFactoryMap[type] = leader;
		return leader;
	}
}