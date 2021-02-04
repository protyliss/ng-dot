import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {DynamicComponentMarkerBase} from '@ng-dot/core';

@Component({
  template: `
			<ng-template #pool></ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'layer-pool'
  }
})
export class DotLayerPoolComponent extends DynamicComponentMarkerBase {

}
