export function bytesToHex(byteArray: Uint8Array): string {
	const result = [];
	const end = byteArray.length;
	let current = -1;
	while (++current < end) {
		let hex = byteArray[current].toString(16).toUpperCase();
		if (hex.length === 1) {
			hex = '0' + hex;
		}
		result.push(hex);
	}
	return result.join('');
}