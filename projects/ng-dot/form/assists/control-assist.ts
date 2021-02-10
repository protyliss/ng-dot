import {Subject} from 'rxjs';
import {FormControlAssistConfigure} from './interfaces';
import {ASSISTERS} from './assisters';

export class ControlAssist {
	protected _control: HTMLInputElement;

	protected _lastValue: string;

	assisted$ = new Subject();

	_keydown = 0;

	protected _configure: FormControlAssistConfigure;

	constructor(control: HTMLInputElement, type: string) {
		this._control = control;

		if (!type) {
			const controlType = control.type;
			if (ASSISTERS[controlType]) {
				type = controlType;
			} else {
				throw TypeError('Assist `type` is required.');
			}
		}

		this._configure = ASSISTERS[type];

		control.onkeyup = this._onKeyup.bind(this);
		control.onkeydown = this._onKeydown.bind(this);
	}

	protected _onKeydown(event: KeyboardEvent) {
		const {key} = event;
		if (key && key.length > 1) {
			return true;
		}

		if (this._keydown++ !== 0) {
			this.assist(event);
		}
	}

	protected _onKeyup(event: KeyboardEvent) {
		const {key} = event;
		if (key.length > 1) {
			switch (key) {
				case 'Backspace':
				case 'Delete':
					this._assist(this._configure.remove);
			}

			return true;
		}

		this._keydown--;

		if (event.ctrlKey) {
			if (key !== 'v') {
				return true;
			}
		}

		this.assist(event);
	}

	protected assist(event: KeyboardEvent) {
		const {value} = this._control;
		if (!value || value === this._lastValue) {
			return null;
		}

		this._assist(this._configure.add);
	}

	protected _assist(map) {
		if (!map) {
			return;
		}

		const {value} = this._control;

		const end = map.length;
		let current = -1;
		let step;
		let regexp;
		let replace = value;
		while (++current < end) {
			step = map[current];
			regexp = step[0];

			if (regexp.test(value)) {
				replace = value.replace(regexp, step[1]);
				break;
			}
		}

		if (current < end) {
			if (value !== replace) {
				this.assisted$.next(replace);
			}
		}

		this._lastValue = replace;

		return true;
	}
}
