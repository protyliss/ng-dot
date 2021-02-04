import {TalkBase} from '../classes/talk-base';
import {WorkerTalk} from './worker-talk';

export abstract class WorkerBase extends TalkBase<WorkerTalk> {
	protected _talkGetOperator(): (new(...args: any[]) => WorkerTalk) | WorkerTalk {
		return WorkerTalk as any;
	}
}