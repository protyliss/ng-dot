import {Injectable, Injector} from '@angular/core';
import {StyleServiceBase} from '@ng-dot/core';
import {TransStyleComponent} from './trans-style.component';

@Injectable()
export class TransStyleService extends StyleServiceBase {
	constructor(injector: Injector) {
		super(injector, TransStyleComponent);
	}
}
