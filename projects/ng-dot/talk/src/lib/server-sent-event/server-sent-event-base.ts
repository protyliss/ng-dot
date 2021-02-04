import {TalkBase} from '../classes/talk-base';
import {ServerSentEventTalk} from './server-sent-event-talk';

export abstract class ServerSentEventBase<TYPES extends string = string> extends TalkBase<ServerSentEventTalk<TYPES>, TYPES> {
  protected _talkGetOperator() {
    return ServerSentEventTalk as any;
  }
}