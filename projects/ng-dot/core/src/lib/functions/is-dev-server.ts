export let isDevServer = function () {
	return (isDevServer = function () {
		return location.host.startsWith('localhost:4');
	}).apply(this);
};