/**
 * Add capacity unit from bytes
 * @param _bytes
 * @param _decimals
 */
export let toByteFormat: (bytes: number, decimals: number) => string = function (_bytes, _decimals) {
	const {floor, log, pow} = Math;
	
	const $units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const $block = 1024;
	const $blockLog = log($block);
	
	return (toByteFormat = function (bytes, decimals = 2) {
		if (!bytes) {
			return '0 ' + $units[0];
		}

		const level = floor(log(bytes) / $blockLog);
		return parseFloat((bytes / pow($block, level)).toFixed(decimals)) + ' ' + $units[level];
	}).apply(this, arguments);
}