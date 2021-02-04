import {Directive, Input} from '@angular/core';
import {withRipple} from './with-ripple';
import {MixinComponent} from '@ng-dot/core';

@Directive({
	selector: '[dotRipple]',
	inputs: ['ripple']
})
export class DotRippleDirective extends MixinComponent.apply(withRipple) {
	@Input('dotRipple') set fromSelector(ripple: boolean) {
		if (typeof ripple === 'boolean') {
			this.ripple = ripple;
		}
	}
}
