import {BehaviorSubject} from 'rxjs';
import {ProxySubject} from './proxy-subject';

export abstract class ProxyBehaviorSubject<T> extends ProxySubject<T> {
	private _value: T;
	protected _subject: BehaviorSubject<T>;
	
	get value() {
		return (this._subject as BehaviorSubject<T>).value;
	}
	
	protected constructor(subject?: BehaviorSubject<T>) {
		super(subject || new BehaviorSubject(null));
		this._value = this._subject.value;
	}

	getValue() {
		return this._subject.getValue();
	}
}