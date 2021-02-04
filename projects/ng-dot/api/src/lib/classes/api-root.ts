import {ApiRootBase} from './api-root-base';
import {ApiPath}     from './api-path';

export class ApiRoot<PATH, BODY, RESPONSE> extends ApiRootBase<PATH, BODY, RESPONSE> {
	protected _children(method: string, path: string);
	protected _children(method, path) {
		return new ApiPath(method, path);
	}
}
