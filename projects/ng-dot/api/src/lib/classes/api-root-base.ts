import {ApiClientInterface} from '../classes/api-client';
import {ApiPathInterface} from '../models/api-path-interface';
import {ApiRootInterface} from '../models/api-root-interface';
import {ApiDefaultBody, ApiDefaultPath, ApiDefaultResponse, ApiPathChild} from '../types';

export abstract class ApiRootBase<PATH = ApiDefaultPath,
	BODY = ApiDefaultBody,
	RESPONSE = ApiDefaultResponse>
	implements ApiRootInterface<PATH, BODY, RESPONSE> {

	protected _accept: any;
	protected _credential: any;

	path = '';

	protected _client: ApiClientInterface;

	constructor(client: ApiClientInterface, path: string);
	constructor(client: ApiClientInterface);
	constructor(path: string);
	constructor(client_or_path?, path?) {
		let client;
		if (path) {
			client = client_or_path;
		} else {
			if (typeof client_or_path !== 'string') {
				path = client_or_path;
			} else {
				client = client_or_path;
			}
		}

		this._client = client;
		this.path = path || '';
	}

	protected abstract _children(method: string, path?: string): ApiPathInterface;

	get<CHILD_PATH = ApiDefaultPath, CHILD_RESPONSE = ApiDefaultResponse, NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>
	(path?: string): ApiPathInterface<NEW_PATH, BODY, CHILD_RESPONSE>;
	get(path?) {
		return this._children('get', path);
	}

	post<CHILD_PATH, CHILD_BODY = ApiDefaultBody, CHILD_RESPONSE = ApiDefaultResponse, NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>
	(path?: string): ApiPathInterface<NEW_PATH, CHILD_BODY, CHILD_RESPONSE>;
	post(path?) {
		return this._children('post', path);
	}

	put<CHILD_PATH, CHILD_BODY = ApiDefaultBody, CHILD_RESPONSE = ApiDefaultResponse, NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>
	(path?: string): ApiPathInterface<NEW_PATH, CHILD_BODY, CHILD_RESPONSE>;
	put(path?) {
		return this._children('put', path);
	}

	delete<CHILD_PATH, CHILD_RESPONSE = ApiDefaultResponse, NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>(path?: string): ApiPathInterface<NEW_PATH, BODY, CHILD_RESPONSE>;
	delete(path?) {
		return this._children('delete', path);
	}

	patch<CHILD_PATH, CHILD_BODY = ApiDefaultBody, CHILD_RESPONSE = ApiDefaultResponse, NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>
	(path?: string): ApiPathInterface<NEW_PATH, CHILD_BODY, CHILD_RESPONSE>;
	patch(path?) {
		return this._children('patch', path);
	}

	accept(type: string);
	accept(type) {
		this._accept = type;
	}


	credential(flag) {
		this._credential = flag;
	}
}
