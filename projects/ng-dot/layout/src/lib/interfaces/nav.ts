export type NavType =
	| 'xy'
	| 'x'
	| 'y'
	| 'tree';

export interface NavItem {
	href: string;
	label: string;
	icon: string;
	children: NavItem[];
	selected: boolean;
	display: boolean;
}