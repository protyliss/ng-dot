import {Route} from '@angular/router';

export function routeIndex(target: Object | string): Route {
	return (typeof target === 'string' ?
		{
			path: '',
			pathMatch: 'full',
			redirectTo: target
		} :
		{
			path: '',
			pathMatch: 'full',
			component: target
		}) as Route;
}