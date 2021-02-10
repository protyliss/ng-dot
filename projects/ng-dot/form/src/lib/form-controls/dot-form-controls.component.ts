import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ComponentRef,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	SimpleChanges,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import {Constructor, DotComponentService, DotDynamicComponentMarkerComponent} from '@ng-dot/core';
import {BehaviorSubject} from 'rxjs';
import {FormControlComponentBase} from '../classes/form-control-component-base';
import {FormControlInterface} from '../interfaces/form-control-interface';
import {FormInterface} from '../interfaces/form-interface';
import {DotFormInputComponent} from './dot-form-input.component';
import {DotFormSelectComponent} from './dot-form-select.component';
import {DotFormTextareaComponent} from './dot-form-textarea.component';

@Component({
	selector: 'dot-form-controls',
	template: `
		<dot-dynamic-component-marker></dot-dynamic-component-marker>
    <ng-template #marekr></ng-template>
	`,
	styleUrls: ['dot-form-controls.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'dot-form-controls',
	},
	providers: []
})
export class DotFormControlsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
	@Input() form: FormInterface;

	@ViewChild(DotDynamicComponentMarkerComponent, {static: true}) markerRef: DotDynamicComponentMarkerComponent;

	form$ = new BehaviorSubject<FormInterface>(null);

	protected _init: boolean;
	protected componentRefs: Array<ComponentRef<FormControlInterface>>;

	constructor(
		protected _component: DotComponentService
	) {
	}

	ngOnChanges(changes: SimpleChanges) {
		Object.keys(changes).forEach(key => {
			const change = changes[key];
			const value = change.currentValue;

			this[key] = value;

			if (!this._init) {
				return;
			}
			if (key === 'form') {
				this._updateForm();
			}
		});
	}

	ngOnInit() {
	}

	ngAfterViewInit() {
		this._init = true;
		this._updateForm();
	}

	ngOnDestroy() {
	}

	protected _updateForm() {
		this.form$.next(this.form);
		this._updateControls();
	}

	// @Debounce()
	protected _updateControls() {
		const {_component, form} = this;
		const {controls} = form;

		const end = controls.length;
		let current = -1;
		let control;
		let type;
		let constructor;

		if (this.componentRefs) {
			this.componentRefs.forEach(destroyMapFunction);
		}

		const componentRefs = [];
		let component: ComponentRef<any>;

		while (++current < end) {

			control = controls[current];

			if (control.unuse) {
				continue;
			}

			control.ready();
			type = control.type;

			constructor = type === 'custom' ?
				control['component'] :
				this.getComponent(control.type);

			component = _component.append(
				this.markerRef.viewContainerRef,
				constructor,
				{
					form,
					control,
					...(control['componentInputs'] || {})
				}
			);

			control.setElement(component.instance);
			componentRefs.push(component);
		}

		this.componentRefs = componentRefs;

		this.form.focus();
	}

	getComponent(type): Constructor<FormControlComponentBase> {
		switch (type) {
			case 'textarea':
				return DotFormTextareaComponent;
			case 'select':
				return DotFormSelectComponent;
		}

		return DotFormInputComponent;
	}
}

function destroyMapFunction(component: ComponentRef<any>) {
	component.destroy();
}
