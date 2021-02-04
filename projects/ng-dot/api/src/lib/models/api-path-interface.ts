import {ApiBaseInterface}                                                      from './api-base-interface';
import {Observable}                                                            from 'rxjs';

export interface ApiPathInterface<PATH = null, BODY = null, RESPONSE = any>
	extends ApiBaseInterface<PATH, BODY, RESPONSE> {

	pathIntercept<NEW_PATH = PATH>(interceptor: (path: PATH) => NEW_PATH)
		: ApiPathInterface<NEW_PATH, BODY, RESPONSE>;

	bodyIntercept<NEW_BODY = BODY>(interceptor: (body: BODY) => NEW_BODY)
		: ApiPathInterface<PATH, NEW_BODY, RESPONSE>;

	responseIntercept<NEW_RESPONSE = RESPONSE>(interceptor: (response: RESPONSE) => NEW_RESPONSE)
		: ApiPathInterface<PATH, BODY, NEW_RESPONSE>;


	_extend(ExtendConstructor);
	
	pipe(...operators);

	request(path: PATH, body?: BODY, options?: any): Observable<RESPONSE>;
}
