/**
 * get clone object
 * @param object
 */
export function objectClone(object) {
	return JSON.parse(JSON.stringify(object));
}