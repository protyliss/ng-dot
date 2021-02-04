import {ViewChild, ViewContainerRef, Directive} from '@angular/core';
import {DynamicComponentMarker} from '../interfaces';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DynamicComponentMarkerBase implements DynamicComponentMarker {
	@ViewChild('pool', {static: true, read: ViewContainerRef}) viewContainerRef;
}
