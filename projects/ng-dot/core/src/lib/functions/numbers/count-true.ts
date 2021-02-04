export function countTrue(...args: boolean[]): number;
export function countTrue(...args) {
	let current = args.length;
	let count = 0;
	while (current-- > 0) {
		if (args[current] === true) {
			count++;
		}
	}
	return count;
}