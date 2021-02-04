import {Injectable, Injector} from '@angular/core';
import {ActivatedRoute, Resolve, ResolveData, Router} from '@angular/router';
import {isNumeric} from '@ng-dot/core';
import {BehaviorSubject, from, Observable, of, Subject, Subscription, zip} from 'rxjs';
import {debounceTime, distinctUntilChanged, first, map, skip} from 'rxjs/operators';
import {DotRouteEventService} from './dot-route-event.service';
import {DotRouteService} from './dot-route.service';

type PageSharedPoolType =
	| 'slug'
	| 'query';

type PagePoolType =
	| PageSharedPoolType
	| 'data';

interface PageData {
	subject: BehaviorSubject<string | number>;
	subjectWithCast: Observable<any>;
	subjectWithFilter: Observable<any>;
	count: number;
}

interface PageDataPool {
	[key: string]: PageData;
}

const DISTINCT_UNTIL_CHANGED_FUNCTION = distinctUntilChanged();
const DEBOUNCE_TIME_FUNCTION = debounceTime(48);
const CAST_MAP_FUNCTION = map((value: any) => {
	return isNumeric(value) ? parseFloat(value) : value;
});

const SHARED_POOL: Record<PageSharedPoolType, PageDataPool> = {
	slug: {},
	query: {}
};

@Injectable()
/**
 * @description
 *   this service makes easy to using the path parameter, query string and the resolvers
 */
export class DotRoutePageService {
	protected subscriptions = new Subscription;

	protected _dataPool: PageDataPool = {};

	protected _requested: Record<PageSharedPoolType, string[]> = {
		slug: [],
		query: [],
	};

	protected _complexSubjects: BehaviorSubject<any>[] = [];

	protected _lastUrl: string;

	protected _resolves: Record<string, ResolveData>;
	protected _resolvers: Record<string, Resolve<any>> = {};
	protected _resolveData: ResolveData;

	protected _firstResolved: boolean;
	protected _setResolved: boolean;

	protected _expendParams: Record<string, any>;

	changed$ = new Subject;

	set subscription(subscription: Subscription) {
		this.subscriptions.add(subscription);
	}

	constructor(
		protected _injector: Injector,
		protected _route: DotRouteService,
		protected _routeEvent: DotRouteEventService,
		protected _router: Router,
		protected _activatedRoute: ActivatedRoute,
	) {
		const routeConfig = _activatedRoute.routeConfig || {};

		this._resolves = routeConfig.resolve || {};
		this._resolveData = _activatedRoute.snapshot.data;

		this.subscription = this._routeEvent.ended$
			.subscribe(this._updates.bind(this));

		// if ((routeConfig.children || []).some(hasExpandPath)) {
		// 	this.subscription = _route.expanded$
		// 		.subscribe(expandParams => {
		// 			if (expandParams) {
		// 				this._expendParams = expandParams;
		// 			}
		// 		});
		//
		// 	this.subscription = _route.reduced$
		// 		.subscribe(expandParams => {
		// 			if (expandParams) {
		// 				this._expendParams = null;
		// 				Object.keys(expandParams).forEach(key => {
		// 					const item = SHARED_POOL.slug[key];
		// 					if (item) {
		// 						item.subject.next(null);
		// 					}
		// 				});
		// 			}
		// 		});
		//
		// 	this.subscription = _route.expandResolve$
		// 		.subscribe(response => {
		// 			const [resolveMap, resolve] = response;
		//
		// 			this._resolves = {
		// 				...this._resolves,
		// 				...resolveMap
		// 			};
		//
		// 			this._resolveData = {
		// 				...this._resolveData,
		// 				...resolve
		// 			};
		// 		});
		// }
	}

	/**
	 * connect component to page service for destroy
	 * @param component
	 */
	with<T extends { ngOnDestroy: Function }>(component: T) {
		// try {
		// 	throw new Error('Does not use this method');
		// } catch (reason) {
		// 	console.warn(reason);
		// }
	}

	destroy() {
		this.subscriptions.unsubscribe();

		this.changed$.complete();

		const localPools = [this._dataPool];
		let poolCurrent = localPools.length;
		while (poolCurrent-- > 0) {
			const pool = localPools[poolCurrent];
			const keys = Object.keys(pool);
			let current = keys.length;
			while (current-- > 0) {
				const {subject} = pool[keys[current]];
				subject.complete();
			}
		}

		const {_requested} = this;
		const sharedPoolTypes = Object.keys(_requested);
		let typeCurrent = sharedPoolTypes.length;
		while (typeCurrent-- > 0) {
			const type = sharedPoolTypes[typeCurrent];
			const keys = _requested[type];
			let keyCurrent = keys.length;
			while (keyCurrent-- > 0) {
				const pool = SHARED_POOL[type];
				const key = keys[keyCurrent];
				const item = pool[key];
				if (item) {
					if (--item.count < 1) {
						item.subject.complete();
						delete pool[key];
					}
				}
			}
		}

		this._next = (() => {
		}) as any;

		this._update = (() => {
		}) as any;

		this._updates = (() => {
		}) as any;
	}

	/**
	 * update router params, data(resolvers)
	 * @private
	 */
	// @Debounce(48)
	protected _updates(url: string) {
		if (url === this._lastUrl) {
			return false;
		}

		this._lastUrl = url;

		const {snapshot} = this._activatedRoute;
		const {params, queryParams} = snapshot;

		const {_resolves, _expendParams} = this;

		if (params || _expendParams) {
			this._update(
				'slug',
				params ?
					_expendParams ?
						{
							...params,
							..._expendParams
						} :
						params :
					_expendParams
			);
		}

		if (queryParams) {
			this._update('query', queryParams);
		}

		if (_resolves) {
			if (this._firstResolved) {
				const {_resolvers, _injector} = this;

				Object.keys(_resolves).forEach(key => {

					let resolver = _resolvers[key];
					if (!resolver) {
						resolver =
							_resolvers[key] = _injector.get(_resolves[key]);
					}

					let subject = resolver
						.resolve(
							snapshot,
							this._router.routerState.snapshot
						);

					subject = (subject instanceof Promise ?
						from(subject) :
						subject['subscribe'] && typeof subject['subscribe'] === 'function' ?
							subject :
							of(subject));

					subject
						.pipe(
							first()
						)
						.subscribe(value => {
							this._next('data', key, value);
						});
				});
			} else {
				this._firstResolved = true;
				this._update('data', this._resolveData);
			}
		}

		this.changed$.next(true);
	}

	protected _getPool(type: PagePoolType) {
		return type === 'data' ?
			this._dataPool :
			SHARED_POOL[type];
	}

	protected _update(type: PagePoolType, values: Record<string, any>) {
		const clone = {...values};
		const pool = this._getPool(type);

		let keys = Object.keys(pool);
		let current = keys.length;

		while (current-- > 0) {
			const key = keys[current];
			this._next(type, key, clone[key]);
		}

		keys = Object.keys(clone);
		current = keys.length;
		while (current-- > 0) {
			const key = keys[current];
			this._next(type, key, clone[key]);
		}
	}

	protected _next(type: PagePoolType, key: string, value: any): PageData {
		const pool = this._getPool(type);

		let item = pool[key];

		if (item) {
			item.subject.next(value);
		} else {

			const subject = new BehaviorSubject(value);

			item = {
				subject,
				subjectWithCast: subject.pipe(
					CAST_MAP_FUNCTION
				),
				subjectWithFilter: subject.pipe(
					DISTINCT_UNTIL_CHANGED_FUNCTION,
					CAST_MAP_FUNCTION
				),
				count: 0
			};

			pool[key] = item;
		}

		return item;
	}

	protected _getSubjects(type: PagePoolType, conditions: [string] | [string, string] | [Record<string, string | number>]) {
		const firstItem = conditions[0];

		let complexSubject;

		const getItem = this._getSubject.bind(this, type);

		if (Array.isArray(firstItem)) {
			complexSubject = zip(
				...firstItem.map(
					key => getItem(key).subjectWithCast
				)
			)
				.pipe(
					DEBOUNCE_TIME_FUNCTION,
					map((subjects: Observable<any>[]) => {
						return subjects.reduce(
							(_map, subject, index) => {
								_map[firstItem[index]] = subject;
								return _map;
							},
							{}
						);
					})
				);
		} else if (typeof firstItem === 'object') {
			const keys = Object.keys(firstItem);
			complexSubject = zip(
				...keys.map(
					key => getItem(key, firstItem[key]).subjectWithCast
				)
			)
				.pipe(
					DEBOUNCE_TIME_FUNCTION,
					map((subjects: Observable<any>[]) => {
						return subjects.reduce(
							(_map, subject, index) => {
								_map[keys[index]] = subject;
								return _map;
							},
							{}
						);
					})
				);
		}

		if (complexSubject) {
			this._complexSubjects.push(complexSubject);
			return complexSubject;
		}

		return this._getSubject(type, <string>firstItem, conditions[1]).subjectWithFilter;
	}

	protected _getSubject(type: PagePoolType, key: string, defaults?: string | number): PageData {
		this._requested[type].push(key);

		const pool = this._getPool(type);

		let item = pool[key];

		if (item) {
			item.count++;
		} else {
			if (defaults === undefined) {
				const skipCount = this._lastUrl ? 0 : 1;
				const subject = new BehaviorSubject(undefined);

				item = {
					subject,
					subjectWithCast: subject.pipe(
						CAST_MAP_FUNCTION
					),
					subjectWithFilter: subject.pipe(
						skip(skipCount),
						DISTINCT_UNTIL_CHANGED_FUNCTION,
						CAST_MAP_FUNCTION
					),
					count: 1
				};
			} else {
				const subject = new BehaviorSubject(defaults);

				item = {
					subject,
					subjectWithCast: subject.pipe(CAST_MAP_FUNCTION),
					subjectWithFilter: subject.pipe(
						map(response => {
							return response === undefined ?
								defaults :
								response;
						}),
						DISTINCT_UNTIL_CHANGED_FUNCTION
					),
					count: 1
				};
			}

			pool[key] = item;
		}

		return item;
	}

	/**
	 * Get slug from path
	 * @param key
	 * @param defaults
	 */
	slug$<T = string>(key: string, defaults?: any): Observable<T>;

	/**
	 * get slugs from path as Map using Array
	 * @param arrayMap
	 */
	slug$<T extends string>(arrayMap: T[]): Observable<Record<T, string>>;

	/**
	 * Get slugs from path as Map using Object
	 * @param objectMap
	 */
	// tslint:disable-next-line:unified-signatures
	slug$<T extends object>(objectMap: T): Observable<Record<keyof T, any>>;

	/**
	 * Get Slug or Slugs as Map
	 * @param conditions
	 */
	slug$(...conditions) {
		return this._getSubjects('slug', conditions as any);
	}

	/**
	 * Get Query string
	 * @param key
	 * @param defaults
	 */
	query$<T = string>(key: string, defaults?: any): Observable<T>;

	/**
	 * Get Query strings as Map using Array
	 * @param arrayMap
	 */
	query$<T extends string>(arrayMap: T[]): Observable<Record<T, string>>;
	// tslint:disable-next-line:unified-signatures
	/**
	 * Get Query strings as Map using Object
	 * @param objectMap
	 */
	query$<T extends object>(objectMap: T): Observable<Record<keyof T, any>>;

	/**
	 * Get Query string or Query strings as Map
	 * @param conditions
	 */
	query$(...conditions) {
		return this._getSubjects('query', conditions as any);
	}

	hasData(key) {
		return this._resolves[key];
	}

	/**
	 * Get Route Resolve Data
	 * @param key
	 */
	data$(key: string);

	/**
	 * Get Route Resolve Dataset as Map using Array
	 * @param keys
	 */
	data$(...keys: string[]);

	/**
	 * Get Route Resolve Data or Dataset as Map
	 * @param keys
	 */
	data$(...keys) {
		const {_resolves, _dataPool} = this;

		const subjects = keys.map(key => {
			let item = _dataPool[key];
			if (!item) {
				const subject = new BehaviorSubject(null);

				item = {
					subject,
					subjectWithCast: null,
					subjectWithFilter: subject.pipe(skip(1)),
					count: 1
				};

				_dataPool[key] = item;
			}

			if (!_resolves[key]) {

				item.subject.error(`Cannot found Route.resolve.${key}`);
			}

			return item;
		});

		if (keys.length === 1) {
			return subjects[0].subjectWithFilter;
		}

		return zip(...subjects.map(item => item.subject))
			.pipe(
				map(responses => {
					return keys.reduce((stringHas, key, index) => {
						stringHas[key] = responses[index];
						return stringHas;
					}, {});
				})
			);
	}
}

// function hasExpandPath(route) {
// 	return route['component'] && route['component'] === DotExpandPathComponent;
// }
