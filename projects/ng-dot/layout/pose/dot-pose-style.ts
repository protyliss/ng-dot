import {ChangeDetectionStrategy, Component, Injectable, Injector, ViewEncapsulation} from '@angular/core';
import {StyleServiceBase} from '@ng-dot/core';

@Component({
	template: '',
	styleUrls: [
		'dot-pose.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DotPoseStyleComponent {
}

@Injectable()
export class DotPoseStyleService extends StyleServiceBase {
	constructor(injector: Injector) {
		super(injector, DotPoseStyleComponent);
	}
}