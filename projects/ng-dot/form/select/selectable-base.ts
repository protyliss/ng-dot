import {Directive, Input} from '@angular/core';
import {FormSelectOption} from '@ng-dot/form';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class SelectableComponentBase /*implements SelectableInterface*/ {
	_options: FormSelectOption[];

	@Input() multiple;
	@Input() unselectable;

	@Input() selectedOption;
	@Input() selected;

	select(option) {
		const changed = this.multiple ?
			this._selectMultiple(option) :
			this._selectOne(option);
		if (changed) {
			this._onChanged();
		}
		return this;
	}

	_selectOne(option) {
		const {value} = option;

		if (this.selected === value) {
			if (!this.unselectable) {
				return false;
			}
			option.selected = false;
			this.selected = null;
			this.selectedOption = null;
		} else {
			if (this.selectedOption) {
				this.selectedOption.selected = false;
			}
			option.selected = true;
			this.selected = value;
			this.selectedOption = option;
		}

		return true;
	}

	_selectMultiple(option) {
		const {selected, selectedOption} = this;
		const {value} = option;

		if (Array.isArray(selected)) {
			const hasIndex = selected.indexOf(value);
			if (hasIndex > -1) {
				if (!this.unselectable) {
					return false;
				}

				option.selected = false;
				selected.splice(hasIndex, 1);
				selectedOption.splice(hasIndex, 1);
				if (!selected.length) {
					this.selected = null;
					this.selectedOption = null;
				}
			} else {
				option.selected = true;
				selected.push(value);
				selectedOption.push(option);
			}
		} else {
			option.selected = true;
			this.selected = [value];
			this.selectedOption = [option];
		}

		return true;
	}

	abstract _onChanged();
}
