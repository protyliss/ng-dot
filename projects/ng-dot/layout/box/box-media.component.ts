import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {BoxComponent} from './box.component';

@Component({
    selector: 'dot-box-media',
    template: `
        <div class="dot-box-media-area">
            <div class="dot-box-pad" #gridNode>
                <ng-content></ng-content>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'dot-box-media'
    }
})
export class BoxMediaComponent {
    constructor(box: BoxComponent) {

    }
}
