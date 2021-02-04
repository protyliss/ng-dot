import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'dot-box',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: [
    	'./box.scss'
	],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'dot-box'
    },

})
export class BoxComponent {
}