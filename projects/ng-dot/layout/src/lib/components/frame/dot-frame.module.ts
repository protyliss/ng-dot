import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AreaComponent} from './area.component';
import {AsideComponent} from './aside.component';
import {DotsComponent} from './dots.component';
import {FootComponent} from './foot.component';
import {HeadComponent} from './head.component';
import {MainHeadComponent} from './main-head.component';
import {MainComponent} from './main.component';
import {PadComponent} from './pad.component';
import {SectionComponent} from './section.component';
import {TitleComponent} from './title.component';

const components = [
	DotsComponent,
	HeadComponent,
	MainComponent,
	MainHeadComponent,
	TitleComponent,
	FootComponent,
	AreaComponent,
	PadComponent,
	SectionComponent,
	AsideComponent
];

@NgModule({
	declarations: components,
	imports: [
		CommonModule
	],
	exports: components
})
export class DotFrameModule {

}
