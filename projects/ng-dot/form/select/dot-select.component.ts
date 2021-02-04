import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormSelectOption, FormSelectOptionsLike, FormSelectRenderType} from '@ng-dot/form';
import {SelectableComponentBase} from './selectable-base';

@Component({
	selector: 'dot-select',
	template: `
		<ng-container *ngIf="options">
			<ul dotGrid="4" [gridGap]="listGap">
				<ng-container *ngFor="let option of _options">

					<li [value]="option.value" (click)="select(option)"
						[class._selected]="option.selected"
						role="option"
						class="dot-select-option"
					>
						<p class="dot-select-option-label">
							{{option['label']}}
						</p>
						<p *ngIf="option.script; let script"
						   class="dot-select-option-script">
							{{script}}
						</p>
					</li>

				</ng-container>
			</ul>
		</ng-container>
	`,
	styleUrls: ['./select.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-select',
		// '[class._selected]',
		'[style.width]': 'width'
	}
})
export class DotSelectComponent extends SelectableComponentBase {
	@Input() style: FormSelectRenderType = 'list';
	@Input() listGrid = 4;
	@Input() listGap = 20;

	@Input() width: string | number = '100%';

	@Output() changed$ = new EventEmitter<string | number>();

	@Input() set options(options: FormSelectOptionsLike) {
		this._options = formalizeSelectOption(options);
	}

	get options() {
		// todo: ???
		return this._options as any;
	}

	_onChanged() {
		this.changed$.emit(this.selected);
	}
}


export function formalizeSelectOption(options: FormSelectOptionsLike): FormSelectOption[];
export function formalizeSelectOption(options) {
	if (Array.isArray(options)) {
		return options.map(formalizeSelectOptionMap);
	}
	return Object.keys(options).map(label => {
		return {
			label,
			value: options[label]
		};
	});
}

function formalizeSelectOptionMap(option: FormSelectOptionsLike): FormSelectOption;
function formalizeSelectOptionMap(option) {
	const type = typeof option;

	// value
	if (type === 'string' || type === 'number') {
		return {
			label: option,
			value: option
		};
	}

	// [value, label]
	if (Array.isArray(option)) {
		return {
			label: option[1] || option[0],
			value: option[0]
		};
	}

	// {value, label}
	if (option.label === undefined) {
		option.label = option.value;
	}
	// protect reference
	return {...option};
}
