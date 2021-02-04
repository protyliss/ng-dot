import {Directive, Input} from '@angular/core';
import {MixinComponent} from '@ng-dot/core';
import {withLift} from './with-lift';

@Directive({
	selector: '[dotLift]',
	inputs: ['lift']
})
export class DotLiftDirective extends MixinComponent.apply(withLift) {
	@Input('dotLift') set fromSelector(lift: number | string) {
		if (lift) {
			this.lift = lift;
		}
	}
}