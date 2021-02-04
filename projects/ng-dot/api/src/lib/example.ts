import {ApiRoot} from './classes/api-root';
import {ApiClient} from './classes/api-client';

class Test {
	readonly root = new ApiRoot(this._client, '/api/tests');

	one = this.root.get<{ one: string }>('/:one');
	two = this.one.get<{ two: number }>('/:two');
	three = this.two.get<null>();

	a = this.root.post<null, { body: true }, { a: number, b: string }>()
		.responseIntercept<{ c: number }>(response => {
			return {
				c: 1
			};
		})
	;

	constructor(protected _client: ApiClient) {

	}

	test() {
		this.two.request({one: '1', two: 1});
		this.three.request({one: '2', two: 2});

		this.a.request(null)
			.subscribe(response => {
			});
	}
}
