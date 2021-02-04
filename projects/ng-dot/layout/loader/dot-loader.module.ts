import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DotLoaderComponent} from './dot-loader.component';

const views = [
  DotLoaderComponent
];

const modules = [
  CommonModule
];

@NgModule({
  declarations: [
    ...views
  ],
  exports: [
    ...views
  ],
  imports: [
    ...modules
  ]
})
export class DotLoaderModule {

}
