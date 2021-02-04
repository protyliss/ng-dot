import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DotFrameModule} from '@ng-dot/layout';
import {DotGridModule} from '@ng-dot/layout/grid';
import {TabAllDirective} from '../tab/tab-all.directive';
import {TabHeadlineComponent} from '../tab/tab-headline.component';
import {TabHeadlineDirective} from './tab-headline.directive';
import {TabLinkComponent} from './tab-link.component';
import {TabComponent} from './tab.component';
import {TabsComponent} from './tabs.component';

const components = [
	TabsComponent,
	TabComponent,
	TabAllDirective,
	TabLinkComponent,
	TabHeadlineDirective,
	TabHeadlineComponent
];

@NgModule({
	declarations: components,
	exports: components,
	imports: [
		CommonModule,
		PortalModule,
		DotFrameModule,
		DotGridModule
	]
})
export class DotTabModule {

}
