import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoxComponent} from './box.component';
import {BoxHeadComponent} from './box-head.component';
import {BoxFootComponent} from './box-foot.component';
import {BoxMainComponent} from './box-main.component';
import {BoxMediaComponent} from './box-media.component';

const components = [
    BoxComponent,
    BoxMediaComponent,
    BoxHeadComponent,
    BoxMainComponent,
    BoxFootComponent
];

@NgModule({
    declarations: components,
  imports: [
    CommonModule
  ],
    exports: components,
})
export class DotBoxModule {

}
