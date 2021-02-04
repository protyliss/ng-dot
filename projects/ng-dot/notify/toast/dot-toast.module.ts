import {ModuleWithProviders, NgModule} from '@angular/core';
import {DotToastPoolComponent} from './dot-toast-pool.component';
import {DotToastComponent} from './dot-toast.component';
import {CommonModule} from '@angular/common';
import {DotNonKrPipeModule} from '@ng-dot/core';
import {DotFrameModule} from '@ng-dot/layout';
import {DOT_TOAST_CONFIGURE} from './tokens';
import {DotToastConfigure} from '@ng-dot/notify';
import {DotToastStoreService} from './dot-toast-store.service';
import {DotTransModule} from '@ng-dot/layout/trans';
import {DotLiftModule} from '@ng-dot/layout/lift';

@NgModule({
	declarations: [
		DotToastPoolComponent,
		DotToastComponent
	],
	imports: [
		CommonModule,
		DotTransModule,
		DotLiftModule,
		DotNonKrPipeModule,
		DotFrameModule
	],
	providers: [
		DotToastStoreService
	]
})
export class DotToastModule {
	static forRoot(configure: Partial<DotToastConfigure>): ModuleWithProviders<DotToastModule> {
		return {
			ngModule: DotToastModule,
			providers: [
				{
					provide: DOT_TOAST_CONFIGURE,
					useValue: configure,
					multi: false
				}
			]
		};
	}
}
