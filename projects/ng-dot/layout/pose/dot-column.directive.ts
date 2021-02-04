import {Directive} from '@angular/core';
import {DotPoseStyleService} from './dot-pose-style';

@Directive({
	selector: '[dotColumn]',
	host: {
		class: 'dot-column',
	}
})
export class DotColumnDirective {
	constructor(style: DotPoseStyleService) {
	}
}