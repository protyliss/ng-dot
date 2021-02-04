export type Constructor<T = any> = new(...args: any[]) => T;
export type ConstructorExtends<T extends Object> = new(...args: any[]) => T;
export type Diff<T, U> = T extends U ? never : T;
export type Filter<T, U> = T extends U ? T : never;

export type ComponentKeyHas<T> = {
	[K in keyof T]: T[K];
};

export type Partial<T> = { [P in keyof T]+?: T[P] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type OmitFrom<T, V extends Partial<T>> = Pick<T, Exclude<keyof T, keyof V>>;

export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
export type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

// properties
export type Properties<T> = { [P in keyof T]: T[P] };
export type FunctionPropertyName<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
export type NonFunctionPropertyName<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

// option-able properties
export type PartialProperties<T> = { [P in keyof T]+?: T[P] };
export type PartialNonFunctionProperties<T> = { [P in NonFunctionPropertyName<T>]+?: T[P] };

/**
 * T property as when it equal V
 */
export type TypeProperties<T, V> = {
	[K in keyof T]: T[K] extends V ? K : never
}[keyof T];

export type TypeProperty<T, U extends keyof T> = T[U];

export interface Changed<T = any> {
	current: T;
	previous: T;
}

export interface ElementRefLike {
	nativeElement: any;
}

export interface ComponentRefLike<T = any> {
	location: ElementRefLike;
	componentType: any;
	destroy();
}

export interface ViewContainerRefLike {
	element: ElementRefLike;
	length: number;
	clear();
}


export interface DynamicComponentMarker {
	viewContainerRef: ViewContainerRefLike;
}

export type DynamicComponent<T = any> =
	{
		componentRef: ComponentRefLike<T>;
	} & {
	[K in keyof T]?: T[K]
};

export type StringReturnFunction = (() => string);
export type StringsReturnFunction = (() => string[]);

export type NumberReturnFunction = (() => number);
export type NumbersReturnFunction = (() => number[]);
