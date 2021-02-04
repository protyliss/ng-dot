/**
 * ClearInterval, If Declared Timer
 * @param timer
 */
export function checkTimeout(timer: void | number);
/**
 * ClearInterval, If Declared Timer and Return setTimeout as new
 * @param timer
 * @param callback
 * @param delay
 */
export function checkTimeout(timer: void | number, callback: Function, delay: number);
export function checkTimeout(timer, callback?, delay = 0) {
	if (timer) {
		clearTimeout(timer);
	}
	
	if (!callback) {
		return null;
	}
	
	return setTimeout(callback, delay);
}