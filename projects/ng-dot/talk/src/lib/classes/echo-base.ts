import {EchoFactory} from './echo-factory';
import {TalkBase} from './talk-base';
import {SpeakBase} from './speak-base';

export abstract class EchoBase<TYPES extends string = string> extends SpeakBase<TYPES> {
	_echoFactoryMap: Record<string, EchoFactory> = {};


	protected constructor(talk: TalkBase<EchoBase>, uri: string) {
		super(talk, uri);
	}

	/**
	 * Set postMessage and OnMessage as Relay
	 * @param toType
	 * @param fromType
	 */
	echo<REQUEST, RESPONSE = any>(toType: TYPES, fromType?: TYPES): EchoFactory<REQUEST, RESPONSE>;
	echo(toType, fromType?) {
		if (!fromType) {
			fromType = toType;
		}

		const {_echoFactoryMap, _listenMap} = this;

		if (_echoFactoryMap[toType]) {
			throw ReferenceError(`'${toType}' is already declared as Echo`);
		}

		let listen = _listenMap[fromType];
		if (!listen) {
			listen = this.listen(fromType);
		}
		
		const factory = new EchoFactory(this, toType, listen);
		
		_echoFactoryMap[toType] = factory;
		
		return factory;
	}
}