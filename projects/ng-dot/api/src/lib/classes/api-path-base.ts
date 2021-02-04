import {Constructor} from '@ng-dot/core';
import {ApiPathInterface} from '../models/api-path-interface';
import {
	ApiBodyInterceptor,
	ApiDefaultBody,
	ApiDefaultPath,
	ApiDefaultResponse,
	ApiPathInterceptor,
	ApiResponseInterceptor
} from '../types';
import {ApiRoot} from './api-root';

interface Interceptors {
  path: ApiPathInterceptor[];
  body: ApiBodyInterceptor[];
  response: ApiResponseInterceptor[];
}

export abstract class ApiPathBase<PATH = ApiDefaultPath, BODY = ApiDefaultBody, RESPONSE = ApiDefaultResponse>
  extends ApiRoot<PATH, BODY, RESPONSE>
  implements ApiPathInterface<PATH, BODY, RESPONSE> {


  protected _interceptors: Interceptors = {
    path: [],
    body: [],
    response: []
  };

  protected _method: string;

  constructor(method: string,
              path?: string,
              interceptors?: Interceptors
  ) {
    super(path);

    this._method = method;

    if (interceptors) {
      this._interceptors = interceptors;
    }
  }

  abstract request(path: PATH, body?: BODY, options?);
  abstract request(path, body?, options?);

  //////////////////////////////
  // PATH INTERCEPT
  //////////////////////////////
  /**
   * transform the api path by interceptor
   * @param interceptor
   */
  pathIntercept<NEW = PATH>(interceptor: ApiPathInterceptor<PATH, BODY, NEW>)
    : ApiPathInterface<NEW, BODY, RESPONSE>;

  /**
   * transform the api path by two interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   */
  pathIntercept<A = PATH, B = A>(
    a: ApiPathInterceptor<PATH, BODY, A>,
    b: ApiPathInterceptor<A, BODY, B>,
  )
    : ApiPathInterface<B, BODY, RESPONSE>;

  /**
   * api path the transform by three interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   * @param c the Third Interceptor
   */
  pathIntercept<A = PATH, B = A, C = B>(
    a: ApiPathInterceptor<PATH, BODY, A>,
    b: ApiPathInterceptor<A, BODY, B>,
    c: ApiPathInterceptor<B, BODY, C>,
  )
    : ApiPathInterface<C, BODY, RESPONSE>;

  /**
   * transform the api path by forth interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   * @param c the Third Interceptor
   * @param d the Forth Interceptor
   */
  pathIntercept<A = PATH, B = A, C = B, D = C>(
    a: ApiPathInterceptor<PATH, BODY, A>,
    b: ApiPathInterceptor<A, BODY, B>,
    c: ApiPathInterceptor<B, BODY, C>,
    d: ApiPathInterceptor<C, BODY, D>,
  )
    : ApiPathInterface<D, BODY, RESPONSE>;

  /**
   * transform the api path by fifth interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   * @param c the Third Interceptor
   * @param d the Forth Interceptor
   * @param e the Forth Interceptor
   */
  pathIntercept<A = PATH, B = A, C = B, D = C, E = D>(
    a: ApiPathInterceptor<PATH, BODY, A>,
    b: ApiPathInterceptor<A, BODY, B>,
    c: ApiPathInterceptor<B, BODY, C>,
    d: ApiPathInterceptor<C, BODY, D>,
    e: ApiPathInterceptor<D, BODY, E>,
  )
    : ApiPathInterface<E, BODY, RESPONSE>;

  /**
   * transform the api path by over 5 interceptors
   * @param interceptor
   * @param moreInterceptors
   */
  pathIntercept<NEW = PATH>(
    interceptor: ApiPathInterceptor<PATH, BODY>,
    ...moreInterceptors: Array<ApiPathInterceptor<any, BODY, RESPONSE>>
  )
    : ApiPathInterface<NEW, BODY, RESPONSE>;

  pathIntercept(...interceptors): any {
    this._interceptors.path.push(...interceptors);
    return this;
  }


  //////////////////////////////
  // BODY INTERCEPT
  //////////////////////////////
  /**
   * transform the api path by interceptor
   * @param interceptor
   */
  bodyIntercept<NEW = PATH>(interceptor: ApiBodyInterceptor<PATH, BODY, NEW>)
    : ApiPathInterface<PATH, NEW, RESPONSE>;

  /**
   * transform the api path by two interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   */
  bodyIntercept<A = PATH, B = A>(
    a: ApiBodyInterceptor<PATH, BODY, A>,
    b: ApiBodyInterceptor<PATH, A, B>,
  )
    : ApiPathInterface<PATH, B, RESPONSE>;

  /**
   * api path the transform by three interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   * @param c the Third Interceptor
   */
  bodyIntercept<A = PATH, B = A, C = B>(
    a: ApiBodyInterceptor<PATH, BODY, A>,
    b: ApiBodyInterceptor<PATH, A, B>,
    c: ApiBodyInterceptor<PATH, B, C>,
  )
    : ApiPathInterface<PATH, C, RESPONSE>;

  /**
   * transform the api path by forth interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   * @param c the Third Interceptor
   * @param d the Forth Interceptor
   */
  bodyIntercept<A = PATH, B = A, C = B, D = C>(
    a: ApiBodyInterceptor<PATH, BODY, A>,
    b: ApiBodyInterceptor<PATH, A, B>,
    c: ApiBodyInterceptor<PATH, B, C>,
    d: ApiBodyInterceptor<PATH, C, D>,
  )
    : ApiPathInterface<PATH, D, RESPONSE>;

  /**
   * transform the api path by fifth interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   * @param c the Third Interceptor
   * @param d the Forth Interceptor
   * @param e the Forth Interceptor
   */
  bodyIntercept<A = PATH, B = A, C = B, D = C, E = D>(
    a: ApiBodyInterceptor<PATH, BODY, A>,
    b: ApiBodyInterceptor<A, BODY, B>,
    c: ApiBodyInterceptor<B, BODY, C>,
    d: ApiBodyInterceptor<C, BODY, D>,
    e: ApiBodyInterceptor<D, BODY, E>,
  )
    : ApiPathInterface<PATH, E, RESPONSE>;

  /**
   * transform the api path by over 5 interceptors
   * @param interceptor
   * @param moreInterceptors
   */
  bodyIntercept<NEW = PATH>(
    interceptor: ApiBodyInterceptor<PATH, BODY>,
    ...moreInterceptors: Array<ApiBodyInterceptor<PATH, any>>
  )
    : ApiPathInterface<PATH, NEW, RESPONSE>;

  bodyIntercept(...interceptors): any {
    this._interceptors.body.push(...interceptors);
    return this;
  }

  //////////////////////////////
  // RESPONSE INTERCEPT
  //////////////////////////////
  /**
   * transform the api response by interceptor
   * @param interceptor
   */
  responseIntercept<NEW = PATH>(interceptor: ApiResponseInterceptor<PATH, BODY, RESPONSE, NEW>)
    : ApiPathInterface<PATH, BODY, NEW>;

  /**
   * transform the api response by two interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   */
  responseIntercept<A = PATH, B = A>(
    a: ApiResponseInterceptor<PATH, BODY, RESPONSE, A>,
    b: ApiResponseInterceptor<PATH, BODY, A, B>,
  )
    : ApiPathInterface<PATH, BODY, B>;

  /**
   * api path the transform by three interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   * @param c the Third Interceptor
   */
  responseIntercept<A = PATH, B = A, C = B>(
    a: ApiResponseInterceptor<PATH, BODY, RESPONSE, A>,
    b: ApiResponseInterceptor<PATH, BODY, A, B>,
    c: ApiResponseInterceptor<PATH, BODY, B, C>,
  )
    : ApiPathInterface<PATH, BODY, C>;

  /**
   * transform the api response by forth interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   * @param c the Third Interceptor
   * @param d the Forth Interceptor
   */
  responseIntercept<A = PATH, B = A, C = B, D = C>(
    a: ApiResponseInterceptor<PATH, BODY, RESPONSE, A>,
    b: ApiResponseInterceptor<PATH, BODY, A, B>,
    c: ApiResponseInterceptor<PATH, BODY, B, C>,
    d: ApiResponseInterceptor<PATH, BODY, C, D>,
  )
    : ApiPathInterface<PATH, BODY, D>;

  /**
   * transform the api response by fifth interceptor
   * @param a the First Interceptor
   * @param b the Second Interceptor
   * @param c the Third Interceptor
   * @param d the Forth Interceptor
   * @param e the Forth Interceptor
   */
  responseIntercept<A = PATH, B = A, C = B, D = C, E = D>(
    a: ApiResponseInterceptor<PATH, BODY, RESPONSE, A>,
    b: ApiResponseInterceptor<PATH, BODY, A, B>,
    c: ApiResponseInterceptor<PATH, BODY, B, C>,
    d: ApiResponseInterceptor<PATH, BODY, C, D>,
    e: ApiResponseInterceptor<PATH, BODY, D, E>,
  )
    : ApiPathInterface<PATH, BODY, E>;

  /**
   * transform the api response by over 5 interceptors
   * @param interceptor the first interceptor
   * @param moreInterceptors
   */
  responseIntercept<NEW = PATH>(
    interceptor: ApiResponseInterceptor<PATH, BODY, RESPONSE>,
    ...moreInterceptors: Array<ApiResponseInterceptor<any, BODY, any>>
  )
    : ApiPathInterface<PATH, NEW, RESPONSE>;

  responseIntercept(...interceptors): any {
    this._interceptors.response.push(...interceptors);
    return this;
  }

  _extend(ExtendedClass: Constructor<ApiPathInterface>);
  _extend(ExtendedClass) {
    return new ExtendedClass(
      this._method,
      this.path,
      this._interceptors
    );
  }

  pipe(...operators) {
  }
}
