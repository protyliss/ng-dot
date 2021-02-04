import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'dot-head',
    template: `
        <div id="dot-head-area" #gridNode>
            <ng-content></ng-content>
        </div>
    `,
	styleUrls: [
		'./frame.scss'
	],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        id: 'dot-head'
    }
})
export class HeadComponent {

}
