import {
	AfterContentInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	ViewEncapsulation
}                     from '@angular/core';
import {TabComponent} from './tab.component';

@Component({
	selector       : 'a[dot-tab-link]',
	template       : `
        <ng-container *ngIf="tab;else displayContent">
            <ng-container *ngIf="tab.headlineComponentRef; else displayDirective">
                <ng-container *ngTemplateOutlet="tab.headlineComponentRef._template"></ng-container>
            </ng-container>
            <ng-template #displayDirective>
                <ng-container *ngIf="tab.headlineDirectiveRef; else displayHeadline">
                    <span [innerHTML]="tab.headlineDirectiveRef.headline"></span>
                </ng-container>
                <ng-template #displayHeadline>
                    <ng-container *ngIf="tab.headline; else displayContent">
                        {{tab.headline}}
                    </ng-container>
                </ng-template>
            </ng-template>
        </ng-container>
        <ng-template #displayContent>
            <ng-content></ng-content>
        </ng-template>
	`,
	encapsulation  : ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host           : {
		class            : 'dot-tab-link',
		'[class._active]': 'active',
		role             : 'button'
	}
})
export class TabLinkComponent implements AfterContentInit {
	@Input() tab: TabComponent;

	@Input() set active(flag: boolean) {
		this._active = flag;
	}

	protected _active;

	get active() {
		return this._active || (this.tab && this.tab._display);
	}

	constructor(protected changeDetectorRef: ChangeDetectorRef) {

	}

	ngAfterContentInit(): void {
		this.changeDetectorRef.markForCheck();
	}
}
