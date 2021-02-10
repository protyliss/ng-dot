import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {IconComponent} from './icon.component';

@Component({
	selector: 'dot-icon24, i[dot-icon24]',
	templateUrl: './icon.html',
	styleUrls: ['./icon.scss', 'icon24.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'icon24',
		'[hidden]': '!label'
	}
})
export class Icon24Component extends IconComponent {
	@Input('dot-icon24') set fromSelector(icon: string) {
		if (icon) {
			this.label = icon;
		}
	}

	group = 'icon24';
}
