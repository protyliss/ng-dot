import {NgModule} from '@angular/core';
import {DotComponentService} from '@ng-dot/core';
import {CommonModule} from '@angular/common';
import {DotLayerService} from './dot-layer.service';
import {DotLayerPoolComponent} from './dot-layer-pool.component';
import {DotFrameModule} from '@ng-dot/layout';
import {DotLayerComponent} from './dot-layer.component';
import {DotLayerStoreService} from './dot-layer-store.service';


@NgModule({
	declarations: [
		DotLayerPoolComponent,
		DotLayerComponent
	],
  imports: [
    CommonModule, 
	DotFrameModule
  ],
  providers: [
    DotComponentService,
		DotLayerStoreService,
		DotLayerService
  ]
})
export class DotLayerModule {

}
