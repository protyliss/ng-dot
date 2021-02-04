import {TalkBase} from '../classes/talk-base';
import {WebSocketTalk} from './web-socket-talk';

export abstract class WebSocketBase<TYPES extends string = string> extends TalkBase<WebSocketTalk, TYPES> {
	protected _talkGetOperator() {
		return WebSocketTalk as any;
	}
}