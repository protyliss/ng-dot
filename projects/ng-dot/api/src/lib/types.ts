import {ApiPathInterface} from './models/api-path-interface';

export type ApiDefaultPath = null;
export type ApiDefaultBody = null;
export type ApiDefaultResponse = any;

export type ApiPathChild<PATH, CHILD_PATH> =
	PATH extends ApiDefaultPath ?
		CHILD_PATH :
		CHILD_PATH extends ApiDefaultPath ?
			PATH :
			PATH & CHILD_PATH;

export type ApiPath<API> = API extends ApiPathInterface<infer T> ? T : never;
export type ApiBody<API> = API extends ApiPathInterface<any, infer T> ? T : never;
export type ApiResponse<API> = API extends ApiPathInterface<any, any, infer T> ? T : never;

export type ApiPathInterceptor<PATH = ApiDefaultPath, BODY = ApiDefaultBody, NEW = any> =
	| ((path: PATH) => NEW)
	| ((path: PATH, body: BODY) => NEW);

export type ApiBodyInterceptor<PATH = ApiDefaultPath, BODY = ApiDefaultBody, NEW = any> =
	| ((body: BODY) => NEW)
	| ((path: PATH, body: BODY) => NEW);

export type ApiResponseInterceptor<PATH = ApiDefaultPath, BODY = ApiDefaultBody, RESPONSE = ApiDefaultResponse, NEW = any> =
	| ((response: RESPONSE) => NEW)
	| ((path: PATH, body: BODY, response: RESPONSE) => NEW);


export interface ApiPaginateQueries {
	$page?: number;
	$limit: number;
}

export interface ApiPaginateResponse<RESPONSE> {
	data: RESPONSE;
}

export interface ApiExtendInterface {
	setExtend(...args: any[]);
}

export interface ApiPaginateInterface extends ApiExtendInterface {
	setPage(page: number);

	setLimit(limit: number);
}

export interface ApiSortQueries {
	$sort: string;
}

export interface ApiSortInterface extends ApiExtendInterface {
	setSort(sort: string);
}

export interface ApiMatchQueries {
	$target: string;
	$keyword: string;
}

export interface ApiMatchInterface extends ApiExtendInterface {
	setTarget(field: string);

	setKeyword(field: string);
}

export type ApiPaginateFactory = (...args: any[]) => (api: ApiPathInterface) => ApiPaginateInterface;
export type ApiSortFactory = (...args: any[]) => ApiSortInterface;
export type ApiMatchFactory = (...args: any[]) => ApiMatchInterface;

export type Paginated<PATH, BODY, RESPONSE> = ApiPathInterface<ApiPathChild<PATH, ApiPaginateQueries>, BODY, ApiPaginateResponse<RESPONSE>>;
export type Sorted<PATH, BODY, RESPONSE> = ApiPathInterface<PATH & ApiSortQueries, BODY, RESPONSE>;
export type Matched<PATH, BODY, RESPONSE> = ApiPathInterface<PATH & ApiMatchQueries, BODY, RESPONSE>;
