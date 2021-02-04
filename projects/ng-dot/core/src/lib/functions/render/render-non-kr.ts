import {isEmpty} from '../../functions/objects/is-empty';

export let renderNonKr: (value: string | number) => string = function (_value) {
	const _nonKr = /((?:[^가-힣]|\s)+)/g;
	return (renderNonKr = function (value) {
		return isEmpty(value) ?
			value as string :
			String(value).replace(_nonKr, '<span class="non-kr">$1</span>');
	}).apply(this, arguments);
};