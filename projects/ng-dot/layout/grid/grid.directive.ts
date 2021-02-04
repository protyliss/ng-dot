import {Directive, Input, OnChanges, OnInit} from '@angular/core';
import {withGrid} from './with-grid';
import {MixinComponent} from '@ng-dot/core';

@Directive({
	selector: '[dotGrid]',
	// tslint:disable-next-line:no-inputs-metadata-property
	inputs: [
		'grid',
		'gridGap',
		'gridAt42',
		'gridAt48',
		'gridAt54',
		'gridAt64',
		'gridAt76',
		'gridAt10',
		'gridAt12',
		'gridAt14',
		'gridAt16',
		'gridAt18',
		'gridEnable'
	]
})
export class GridDirective extends MixinComponent.apply(withGrid) implements OnInit, OnChanges {
	@Input('dotGrid') set fromSelector(grid: number | string | boolean) {
		if (grid === '') {
			return;
		}

		if (grid < 1 || grid === false) {
			this.gridEnable = false;
		} else {
			this.grid = grid as number;
		}
		
		if (this._gridInit) {
			this._gridSetClass();
		}
	}
}
