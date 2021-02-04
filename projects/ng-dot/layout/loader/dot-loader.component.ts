import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {MixinComponent, SelectorHold} from '@ng-dot/core';
import {withColor} from '@ng-dot/layout';
import {DotLoaderShape} from './types';

@Component({
	selector: 'dot-loader',
	template: `
		<span class="dot-loader" #loader>
			<span>
				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<b></b>
			</span>
		</span>
	`,
	styleUrls: [
		'./dot-loader.scss'
	],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class._inline]': 'inline'
	},
	inputs: ['color']
})
export class DotLoaderComponent extends MixinComponent.apply(withColor) implements OnInit {
	protected _shapeClassNameHolder: SelectorHold<string>;

	@ViewChild('loader', {static: true}) loaderRef: ElementRef<any>;

	@Input() shape: DotLoaderShape = 'circle';

	@Input() inline: boolean;

	ngOnInit() {
		this._shapeClassNameHolder = new SelectorHold(this.loaderRef.nativeElement, {prefix: '_'});

		this._renderLoader();
	}

	protected _renderLoader() {
		this._shapeClassNameHolder.set(this.shape);
	}
}
