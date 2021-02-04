import { isEmpty } from '../functions/objects/is-empty';
import {isFalseLike} from '../functions/objects/is-false-like';

export class Objects {
	static isEmpty(target) {
		return isEmpty(target);
	}

	static isFalseLike(target) {
		return isFalseLike(target);
	}

	static find(object: {}, path: string);
	static find(object, path) {
		if (path.indexOf('.') < 0) {
			return object[path];
		}

		const properties = path.split('.');
		const end = properties.length;

		let target = object;
		let property;
		let current = -1;

		while (++current < end) {
			property = properties[current];
			if (!target.hasOwnProperty(property)) {
				return undefined;
			}

			target = target[property];
		}

		return target;
	}
}
