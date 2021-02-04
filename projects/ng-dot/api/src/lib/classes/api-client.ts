import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

type HttpMethods =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete';

interface HttpOptions {

}

export interface ApiClientInterface {
  head(path: string, options?: {})

  head(path, options?);

  get<RESPONSE>(path: string, options?: {})

  get(path, options?);

  post<RESPONSE>(path: string, body?: {}, options?: {});

  post(path: string, body?, options?);

  put<RESPONSE>(path: string, body?: {}, options?: {});

  put(path: string, body?, options?);

  patch<RESPONSE>(path: string, body?: {}, options?: {});

  patch(path: string, body?, options?);

  delete<RESPONSE>(path: string, options?: {});

  delete(path: string, options?);
}

@Injectable({
  providedIn: 'root'
})
export class ApiClient implements ApiClientInterface {

  constructor(protected _httpClient: HttpClient) {

  }

  request<T>(method: HttpMethods, path: string, options: any)
  request(method, path?, options?) {
    const url = path;
    return this._httpClient.request(method, url, <any>options);
  }

  head(path: string, options?: {});
  head(path, options?);
  head(path: string, options?: {}) {
    const url = path;
    return this._httpClient
      .request('head', url, {
        ...options,
        observe: 'response',
        responseType: 'json'
      })
      .pipe(
        map(response => {
          return response.headers;
        })
      )
  }

  get<RESPONSE>(path: string, options?: {});
  get(path: string, options?: any);
  get(path, options?) {
    return this.request('get', path, options);
  }

  post<RESPONSE>(path: string, body?: {}, options?: {});
  post(path: string, body?, options?);
  post(path: string, body?: {}, options?: {}) {
    return this.request('post', path, bodyOptions(body, options))
  }

  put<RESPONSE>(path: string, body?: {}, options?: {});
  put(path: string, body?, options?);
  put(path: string, body?: {}, options?: {}) {
    return this.request('put', path, bodyOptions(body, options));
  }

  patch<RESPONSE>(path: string, body?: {}, options?: {});
  patch(path: string, body?, options?);
  patch(path: string, body?: {}, options?: {}) {
    return this.request('patch', path, bodyOptions(body, options));
  }

  delete<RESPONSE>(path: string, options?: {});
  delete(path: string, options?);
  delete(path: string, options?: {}) {
    return this.request('delete', path, options);
  }
}


function bodyOptions(body, options) {
  return (body ?
      options ?
        {...options, body} :
        {body} :
      options
  );
}
