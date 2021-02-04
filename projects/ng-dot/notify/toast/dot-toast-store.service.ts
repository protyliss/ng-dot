import {Inject, Injectable, Optional} from '@angular/core';
import {DOT_TOAST_CONFIGURE} from './tokens';
import {DotToastConfigure} from '@ng-dot/notify';

@Injectable()
export class DotToastStoreService {

	configure: DotToastConfigure;

	constructor(
		@Optional() @Inject(DOT_TOAST_CONFIGURE) configure: DotToastConfigure
	) {
		this.configure = {
			position: 'bottom-center',
			...(configure || {})
		};
	}
}
