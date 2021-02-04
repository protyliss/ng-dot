import {
	ChangeDetectionStrategy,
	Component,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
	ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'dot-tab-headline',
  template: `
      <ng-template>
          <ng-content></ng-content>
      </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabHeadlineComponent{

  @ViewChild(TemplateRef, {static: true}) _template: TemplateRef<any>;

  constructor(protected viewContainerRef: ViewContainerRef) {

  }
}
