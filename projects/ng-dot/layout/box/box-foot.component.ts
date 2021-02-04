import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {BoxComponent} from './box.component';

@Component({
    selector: 'dot-box-foot',
    template: `
        <div class="dot-box-pad" #gridNode>
            <ng-content></ng-content>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'dot-box-foot'
    }
})
export class BoxFootComponent {
    constructor(box: BoxComponent) {

    }
}
