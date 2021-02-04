import {NgModule} from '@angular/core';
import {PageLinksComponent} from './page-links.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {DotTransModule} from '@ng-dot/layout/trans';

const views = [
  PageLinksComponent
];
const localViews = [];

const modules = [
  CommonModule,
  RouterModule
];
const localModules = [];
const providers = [];

@NgModule({
  declarations: [
    ...views,
    ...localViews
  ],
  imports: [
    ...modules,
    ...localModules,
    DotTransModule,
  ],
  exports: [
	  ...views,
    ...modules,
  ],
  providers
})
export class DotPageLinksModule {

}
