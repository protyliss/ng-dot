import {Constructor}                              from '@ng-dot/core';
import {ApiPaginateFactory, ApiPaginateInterface} from '../types';
import {ApiPathInterface}                         from '../models/api-path-interface';


export const paginate: ApiPaginateFactory = function (pageQueryName?: string, limitQueryName?: string) {
	return function (api): ApiPaginateInterface {
		const Base = api.constructor as Constructor<ApiPathInterface>;
		return api
			._extend(class extends Base implements ApiPaginateInterface {
				protected _pageQueryName;
				protected _limitQueryName;
				protected _page = 1;
				protected _limit: number;

				// tslint:disable-next-line:no-shadowed-variable
				setExtend(pageQueryName: string, limitQueryName: string) {
					this._pageQueryName = pageQueryName;
					this._limitQueryName = limitQueryName;
					return this;
				}

				setLimit(limit: number) {
					this._limit = limit;
					return this;
				}

				setPage(page: number) {
					this._page = page;
					return this;
				}
			})
			.setExtend(
				pageQueryName,
				limitQueryName
			)
			.responseIntercept(setDefaultMetadata);
	};
};

function setDefaultMetadata(path, body, response) {
	if (!response['page']) {
		response['page'] = path['$page'];
	}
	if (!response['limit']) {
		response['limit'] = path['$limit'];
	}
	return response;
}