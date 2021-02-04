import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MainComponent} from './main.component';

@Component({
  selector: 'dot-main-head',
  template: `
      <dot-area #gridNode>
          <ng-content></ng-content>
      </dot-area>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'dot-main-head'
  }
})
export class MainHeadComponent {
  constructor(main: MainComponent) {

  }
}
