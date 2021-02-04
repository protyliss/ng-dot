import {
	ChangeDetectionStrategy,
	Component, ContentChild, EventEmitter,
	Input, OnInit, Output,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
	ViewEncapsulation
} from '@angular/core';
import {TemplatePortal} from '@angular/cdk/portal';
import {TabHeadlineDirective} from './tab-headline.directive';
import {TabHeadlineComponent} from './tab-headline.component';

@Component({
  selector: 'dot-tab',
  template: `
      <ng-template>
          <ng-content></ng-content>
      </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dot-tab'
  }
})
export class TabComponent implements OnInit {

  @ViewChild(TemplateRef, {static: true}) _template: TemplateRef<any>;

  @ContentChild(TabHeadlineDirective) headlineDirectiveRef: TabHeadlineDirective;
  @ContentChild(TabHeadlineComponent) headlineComponentRef: TabHeadlineComponent;

  @Input() active: boolean;

  @Input() set headline(value: string) {
    this._headline = value;
  }

  @Output() selected$ = new EventEmitter;

  protected _headline: string;

  _display: boolean;
  _content: TemplatePortal<any>;

  get headline() {
    return this.headlineDirectiveRef ?
      this.headlineDirectiveRef.headline :
      this._headline;
  }

  constructor(protected viewContainerRef: ViewContainerRef) {

  }

  ngOnInit(): void {
    this._content = new TemplatePortal(this._template, this.viewContainerRef)
  }

}
