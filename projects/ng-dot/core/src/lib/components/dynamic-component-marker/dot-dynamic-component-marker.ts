import {ChangeDetectionStrategy, Component, NgModule, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {DynamicComponentMarker} from '../../interfaces';
import {CommonModule} from '@angular/common';

@Component({
	selector: 'dot-dynamic-component-marker',
	template: ``,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DotDynamicComponentMarkerComponent implements DynamicComponentMarker {
	constructor(public viewContainerRef: ViewContainerRef) {
	}
}

@NgModule({
	declarations: [
		DotDynamicComponentMarkerComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		DotDynamicComponentMarkerComponent
	]
})
export class DotDynamicComponentMarkerModule {

}