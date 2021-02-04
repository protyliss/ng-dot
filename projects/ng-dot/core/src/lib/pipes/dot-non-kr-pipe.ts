import {
	ChangeDetectionStrategy,
	Component,
	Injectable,
	Injector,
	NgModule,
	Pipe,
	PipeTransform,
	ViewEncapsulation
} from '@angular/core';
import {renderNonKr} from '../functions/render/render-non-kr';
import {StyleServiceBase} from '../classes/style-service-base';

@Component({
	template: ``,
	// styleUrls: ['./dot-non-kr.scss'],
	styles: [`
		.non-kr {
			letter-spacing: 0;
		}
	`],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotNonKrPipeStyleComponent {
}

@Injectable()
export class DotNonKrPipeStyleService extends StyleServiceBase {
	constructor(injector: Injector) {
		super(injector, DotNonKrPipeStyleComponent);
	}
}

@Pipe({
	name: 'nonKr'
})
export class DotNonKrPipe implements PipeTransform {
	constructor(style: DotNonKrPipeStyleService) {
	}

	transform(value: string | number): any {
		return renderNonKr(value);
	}
}

@NgModule({
	declarations: [
		DotNonKrPipe,
		DotNonKrPipeStyleComponent
	],
	exports: [
		DotNonKrPipe
	],
	providers: [
		DotNonKrPipeStyleService
	]
})
export class DotNonKrPipeModule {

}