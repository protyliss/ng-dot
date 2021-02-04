import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[tabHeadline]',
  host: {
    class: 'dot-tab-headline'
  }
})
export class TabHeadlineDirective {
  constructor(protected elementRef: ElementRef) {
  }

  get headline() {
    return this.elementRef.nativeElement.innerHTML;
    //.replace(/class="[^"]+"/, '');
  }
}
