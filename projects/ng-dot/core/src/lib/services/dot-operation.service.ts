import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Debounce} from '../decorators/debounce';
import {checkSubscription} from '../functions/rxjs/check-subscription';

@Injectable()
export class DotOperationService {

	protected _actionMap: Record<string, OperationAction> = {};
	protected _actions: OperationAction[] = [];
	protected _delay = 1000;

	classList$ = new BehaviorSubject<string[]>(null);
	changed$ = new BehaviorSubject(1);

	prepare = 0;
	load = 0;
	cancel = 0;

	action(type: string) {
		const {_actionMap} = this;
		if (!_actionMap[type]) {
			_actionMap[type] = new OperationAction(this, type);
			this._actions.push(_actionMap[type]);
		}
		return _actionMap[type];
	}

	_prepare() {
		this.prepare++;
		this._changed();
	}

	_prepared() {
		this.prepare--;
		if (!this.prepare) {
			this._changed();
		}
	}

	_load() {
		this.load++;
		this._changed();
	}

	_loaded() {
		setTimeout(() => {
			this.load--;

			if (!this.load) {
				this._changed();
			}
		}, this._delay);
	}

	_cancel() {
		this.cancel++;
		this._changed();
	}

	_canceled() {
		setTimeout(() => {
			this.cancel--;

			if (!this.cancel) {
				this._changed();
			}
		}, this._delay);
	}

	@Debounce()
	_changed() {


		let dirty = 0;
		const defaultClassList = [];

		if (this.prepare) {
			defaultClassList.push('_preparing');
		}

		if (this.load) {
			defaultClassList.push('_loading');
		}

		if (this.cancel) {
			defaultClassList.push('_canceling');
		}

		this.classList$.next(
			this._actions.reduce((classList, action) => {
				if (action.actionDirty) {
					dirty++;
					const {value} = action;
					classList.push(
						'_' + action.type + (
							action.actionError ?
								'_error' :
								value || value === 0 || value === false ?
									'_true' :
									'_false'
						)
					);
				}
				return classList;
			}, defaultClassList)
		);

		if (dirty) {
			this.changed$.next(this.changed$.value + 1);
		}
	}
}

export class OperationAction extends BehaviorSubject<any> {
	actionDirty: boolean;
	actionCancel: boolean;
	actionError: boolean;

	protected _actionLoad: boolean;
	protected _actionPrepare: boolean;
	protected _actionSubscription: Subscription;


	get loadable() {
		return !this._actionPrepare && !this._actionLoad;
	}

	set subscription(subscription: Subscription) {
		this._actionSubscription = checkSubscription(this._actionSubscription, subscription);
	}


	constructor(
		protected _operation: DotOperationService,
		public type: string
	) {
		super(null);
	}

	prepare() {
		if (this._actionPrepare || this._actionLoad) {
			return false;
		}
		this._actionPrepare = true;
		this._operation._prepare();
		return this;
	}

	prepared() {
		if (!this._actionPrepare) {
			throw Error('Does not started Prepare');
		}
		this.actionError = false;
		this._actionPrepare = false;
		this._operation._prepared();
	}

	load(): boolean {
		if (this._actionPrepare || this._actionLoad) {
			return false;
		}

		this.actionError = false;
		this._actionLoad = true;
		this._operation._load();
		return true;
	}

	loaded() {
		if (!this._actionLoad) {
			throw Error('Does not started Prepare');
		}
		this._actionLoad = false;
		this._operation._loaded();
	}

	loadOrCancel(): boolean {
		if (this.load()) {
			return true;
		}

		this.cancel();

		return false;
	}

	error(reason?) {
		if (this._actionPrepare) {
			this.prepared();
		}
		if (this._actionLoad) {
			this.loaded();
		}

		this.actionError = true;
		this._operation._changed();
	}

	cancel() {
		const {_actionPrepare, _actionLoad} = this;
		if (!_actionPrepare && !_actionLoad) {
			return false;
		}

		const {_operation, _actionSubscription} = this;

		if (_actionPrepare) {
			this.prepared();
		}

		if (_actionLoad) {
			this.loaded();
		}

		this.actionError = false;

		if (_actionSubscription) {
			_operation._cancel();
			_actionSubscription.unsubscribe();
			_operation._canceled();
		} else {
			_operation._changed();
		}
	}

	next(value) {
		this.actionDirty = true;
		super.next(value);
		this._operation._changed();
	}

	clean() {
		this.actionDirty = false;
		super.next(undefined);
		this._operation._changed();
	}

	nextOrClean(value) {
		if (value) {
			this.next(value);
		} else {
			this.clean();
		}
	}
}