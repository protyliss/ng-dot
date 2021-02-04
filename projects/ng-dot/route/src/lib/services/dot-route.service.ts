import {Injectable, Optional} from '@angular/core';
import {ActivatedRoute, Params, Resolve, ResolveData, Router} from '@angular/router';
import {decodeQueryString, nonNullable, parseUrl, updateQuery} from '@ng-dot/core';
import {Subject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DotRouteService {
	expanded$ = new Subject<Record<string, any>>();
	reduced$ = new Subject<Record<string, any>>();

	expandResolve$ = new Subject<[Record<string, Resolve<any>>, Record<string, any>]>();

	protected _path: string;
	protected _queryParams: Params = {};

	constructor(
		@Optional() protected _router: Router,
		@Optional() protected _activateRoute: ActivatedRoute
	) {

		_activateRoute.queryParams.subscribe(params => {
			this._queryParams = params;
		});
	}

	expand(params: Record<string, any>) {
		this.expanded$.next(params);
	}

	expandResolve(resolveMap: ResolveData, resolve: Record<string, any>) {
		this.expandResolve$.next([resolveMap, resolve]);
	}

	reduce(params: Record<string, any>) {
		this.reduced$.next(params);
	}

	moveParameters(url: string | String[]);
	moveParameters(path: String | String[], query: string | Record<string, string | number>);
	moveParameters(url_or_path, query?) {
		if (Array.isArray(url_or_path)) {
			url_or_path = url_or_path.join('/');
		} else if (url_or_path === null) {
			url_or_path = this._path;
		}

		let path;

		if (url_or_path) {
			const parsedUrl = parseUrl(url_or_path);
			if (parsedUrl) {
				path = parsedUrl.path;
				if (!query) {
					query = parsedUrl.query;
				}
			}
		}

		const commands = path ? path
				.replace(/\/$/, '')
				.split('/') :
			'';

		const queryParams = typeof query === 'string' ?
			decodeQueryString(query) :
			query;

		return {commands, queryParams: nonNullable(queryParams)};
	}

	updateParameters(url: string | String[]);
	updateParameters(path: String | String[], query: string | string[] | Record<string, string | number>);
	updateParameters(url_or_path, query?) {

		const {commands} = this.moveParameters(url_or_path, query);
		return {
			commands,
			queryParams: updateQuery(query, this._queryParams)
		};
	}

	move$(url: string | String[]);
	move$(path: String | String[], query: string | Record<string, string | number>);
	move$(url_or_path, query?) {
		const {commands, queryParams} = this.moveParameters(url_or_path, query);
		return this._router.navigate(commands, {
			queryParams
		});
	}

	update$(url: string | String[]);
	update$(path: String | String[], query: Record<string, string | number>);
	update$(url_or_path, query?) {
		const {commands, queryParams} = this.updateParameters(url_or_path, query);

		return this._router.navigate(commands, {
			queryParams
		});
	}

	refresh() {
		this.move$(null, {
			refresh: Date.now()
		});
	}

	redirect(queryName = 'redirect') {
		const to = getQueryString(queryName);
		if (to) {
			this.move$(decodeURIComponent(to));
		} else {
			this.move$('/');
		}
	}
}

function getQueryString(name: string, source?: string) {
	if (!source) {
		source = location.search;
	}
	const matched = source.match(new RegExp(`[?&]${name}=([^&#]+)`));
	return matched ? matched[1] : null;
}
