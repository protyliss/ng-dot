export interface FormSelectOption {
	value: string | number;
	text?: string;
	script?: string;
	selected?: boolean;
}

export type FormSelectOptionsLike =
	| Array<string | number>[]
	| Record<string, string | number>
	| Record<number, string | number>
	| FormSelectOption[];

export type FormSelectRenderType =
	| 'vanilla'
	| 'dropdown'
	| 'list';