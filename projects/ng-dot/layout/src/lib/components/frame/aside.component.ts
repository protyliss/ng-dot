import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dot-aside',
  template: `
      <div id="dot-aside-area" #gridNode>
          <ng-content></ng-content>
      </div>
  `,
  styleUrls: ['./frame.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'dot-aside',
    role: 'aside'
  }
})
export class AsideComponent {
}
