export interface HasSelect {
	select(): void;
}

export interface HasUnselect {
	unselect(): void;
}

export interface HasInvert {
	invert(): void;
}

export interface SelectableInterface extends HasSelect, HasUnselect, HasInvert {
}