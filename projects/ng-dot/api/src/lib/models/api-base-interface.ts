import {ApiPathInterface} from './api-path-interface';
import {AcceptType}                                                       from './accept-type';
import {ApiDefaultBody, ApiDefaultPath, ApiDefaultResponse, ApiPathChild} from '../../types';

export interface ApiBaseInterface<PATH = ApiDefaultPath, BODY = ApiDefaultBody, RESPONSE = ApiDefaultResponse> {

  get<CHILD_PATH = ApiDefaultPath,
		CHILD_RESPONSE = ApiDefaultResponse,
		NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>
	(path?: string): ApiPathInterface<NEW_PATH, BODY, CHILD_RESPONSE>;
	get(path?);

	post<CHILD_PATH,
		CHILD_BODY = ApiDefaultBody,
		CHILD_RESPONSE = ApiDefaultResponse,
		NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>
	(path?: string): ApiPathInterface<NEW_PATH, CHILD_BODY, CHILD_RESPONSE>;
	post(path?);

	put<CHILD_PATH,
		CHILD_BODY = ApiDefaultBody,
		CHILD_RESPONSE = ApiDefaultResponse,
		NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>
	(path?: string): ApiPathInterface<NEW_PATH, CHILD_BODY, CHILD_RESPONSE>;
	put(path?);

	delete<CHILD_PATH,
		CHILD_RESPONSE = ApiDefaultResponse,
		NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>
	(path?: string): ApiPathInterface<NEW_PATH, BODY, CHILD_RESPONSE>;
	delete(path?);

	patch<CHILD_PATH,
		CHILD_BODY = ApiDefaultBody,
		CHILD_RESPONSE = ApiDefaultResponse,
		NEW_PATH = ApiPathChild<PATH, CHILD_PATH>>
	(path?: string): ApiPathInterface<NEW_PATH, CHILD_BODY, CHILD_RESPONSE>;
	patch(path?);

  /**
   * using credential
   * @param flag
   */
  credential(flag: boolean);

  /**
   * worker accept type header
   * @param type
   */
  accept(type: AcceptType);
}
