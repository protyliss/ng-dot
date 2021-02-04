import {ApiPathBase} from './api-path-base';
import {ApiRequest}  from './api-request';
import {first, map}  from 'rxjs/operators';

export class ApiPath<PATH, BODY, RESPONSE> extends ApiPathBase<PATH, BODY, RESPONSE> {
	request(path: null, body?: null, options?) {


	  this._client.request(this.method);
	}
}
