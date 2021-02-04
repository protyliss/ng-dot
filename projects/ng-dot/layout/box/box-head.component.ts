import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {BoxComponent} from './box.component';


@Component({
  selector: 'dot-box-head',
  template: `
      <div class="dot-box-pad">
          <div class="dot-box-area" #gridNode>
              <ng-content></ng-content>
          </div>
      </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dot-box-head'
  }
})
export class BoxHeadComponent {
  constructor(box: BoxComponent) {
  }
}
