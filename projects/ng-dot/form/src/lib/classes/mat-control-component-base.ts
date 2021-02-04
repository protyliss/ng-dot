import {FocusMonitor} from '@angular/cdk/a11y';
import {Directive, ElementRef, HostBinding, Injector, OnDestroy} from '@angular/core';
import {NgControl} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import {ControlComponentBase} from './control-component-base';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class MatControlComponentBase extends ControlComponentBase implements MatFormFieldControl<string>, OnDestroy {
	autofilled: boolean;
	controlType: string;
	id: string;

	focused: boolean;
	errorState: boolean;

	set placeholder(value: string) {
		super.placeholder = value;
		this.stateChanges.next();
	}

	set required(value: boolean) {
		super.required = value;
		this.stateChanges.next();
	}

	set disabled(value: boolean) {
		super.disabled = value;
		this.stateChanges.next();
	}

	@HostBinding('class.floating')
	get shouldLabelFloat() {
		return this.focused || !this.empty;
	}

	protected _focusMonitor: FocusMonitor;
	protected _elementRef: ElementRef;
	stateChanges = new Subject<void>();

	constructor(public ngControl: NgControl, injector: Injector) {
		super(injector);

		if (this.ngControl != null) {
			this.ngControl.valueAccessor = this;
		}

		const _elementRef = injector.get(ElementRef);
		this._elementRef = _elementRef;
		
		const focusMonitor = injector.get(FocusMonitor);
		this._focusMonitor = focusMonitor;

		focusMonitor.monitor(_elementRef, true).subscribe(origin => {
			this.focused = !!origin;
			this.stateChanges.next();
		});
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this._focusMonitor.stopMonitoring(this._elementRef);
		this.stateChanges.complete();
	}

	onContainerClick(event: MouseEvent) {
		const tagName = (event.target as Element).tagName.toLowerCase();

		switch (tagName) {
			case 'input':
			case 'select':
			case 'textarea':
				this._elementRef.nativeElement.querySelector('input, select, textarea').focus();
				break;
			default:
				this.control.focus();
		}
	}
	
	setDescribedByIds(ids) {
		this.describedBy = ids.join(' ');
	}

	_onFocusChange(origin) {
		super._onFocusChange(origin);
		this.stateChanges.next();
	}
}