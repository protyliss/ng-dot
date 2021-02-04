import {DynamicComponent, PartialProperties} from '@ng-dot/core';
import {ComponentType} from '@angular/cdk/overlay';

export interface DotLayerOption<
	T extends ComponentType<any> = ComponentType<any>,
	V = T extends ComponentType<infer U> ? U : never
	> {
	width?: number | string;
	height?: number | string;
	top?: number  | string;
	right?: number | string;
	bottom?: number | string;
	left?: number | string;
	margin?: number;
	heading?: string;
	maximizable?: boolean;
	maximize?: boolean;
	data?: PartialProperties<V>;
}
