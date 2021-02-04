import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {DotNavItemComponentBase} from './dot-nav-item-component-base';

@Component({
	selector: 'dot-nav-item, [dot-nav-item]',
	template: `
		<ng-template #displayNgContent>
			<span class="icon-label"><ng-content></ng-content></span>
		</ng-template>

		<ng-template #_toggleLink_>
			<ng-container *ngIf="item && hasChild">
				<button>Unfold</button>
			</ng-container>
		</ng-template>

		<ng-container *ngIf="item; else displayLabel">
			<ng-container *ngTemplateOutlet="_toggleLink_"></ng-container>
			<a [routerLink]="link"
			   [queryParams]="queryParams"
			   [routerLinkActive]="activeClass"
			   [routerLinkActiveOptions]="{exact: exact}"
			   [target]="target"
			>
				<ng-container *ngIf="icon$ | async; let icon; else displayText">
					<dot-icon [group]="iconGroup" [label]="icon">
						<ng-container *ngTemplateOutlet="displayText"></ng-container>
					</dot-icon>
				</ng-container>
				<ng-template #displayText>
					<ng-container *ngIf="label; else displayNgContent">
						<span [innerHTML]="item.label"></span>
					</ng-container>
				</ng-template>
			</a>
			<ng-container *ngIf="hasChild">
				<dot-nav [root]="root" [items]="children"></dot-nav>
			</ng-container>
		</ng-container>
		<ng-template #displayLabel>
			<ng-container *ngTemplateOutlet="_toggleLink_"></ng-container>
			<a [routerLink]="link"
			   [queryParams]="queryParams"
			   [routerLinkActive]="activeClass"
			   [routerLinkActiveOptions]="{exact: exact}"
			   [target]="target"
			>
				<ng-container *ngIf="label; else displayContent">
					<ng-container *ngIf="icon$ | async; let icon; else displayText">
						<dot-icon [group]="iconGroup" [label]="icon">
							<ng-container *ngTemplateOutlet="displayText"></ng-container>
						</dot-icon>
					</ng-container>
					<ng-template #displayText>
						<span [innerHTML]="label"></span>
					</ng-template>
				</ng-container>
				<ng-template #displayContent>
					<ng-container *ngIf="icon$ | async; let icon; else displayText">
						<dot-icon [group]="iconGroup" [label]="icon">
							<ng-container *ngTemplateOutlet="displayNgContent"></ng-container>
						</dot-icon>
					</ng-container>
					<ng-template #displayText>
						<ng-container *ngTemplateOutlet="displayNgContent"></ng-container>
					</ng-template>
				</ng-template>
			</a>
			<ng-content select="ul"></ng-content>
		</ng-template>
	`,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		role: 'listitem',
		'[class._active]': 'active'
	}
})
export class DotNavItemComponent extends DotNavItemComponentBase {
	@Input('dot-nav-item') set fromSelector(link: string) {
		if (link) {
			this.link = link;
		}
	}
}
