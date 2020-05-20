const fs = require('fs');
const path = require('path');

interface Api {
	method: string;
	path: string;
	data: string;
}

export class ApiResponseParser {

	private apis: Api[] = [];

	constructor() {
		console.log('loading apis ...');
		this.mapApis(__dirname + '/responses');
		console.log('loaded ' + this.apis.length + ' apis');
	}

	getResponse(method: string, path: string): any {
		const api = this.apis.find(api => (api.method === method && this.matchPath(api.path, path)));
		return api ? api.data : null;
	}

	private matchPath(pathReq: string, path: string) {
		const match = path.match(pathReq);
		return match && path === match[0];
	}

	private mapApis(dir: string) {
		fs.readdirSync(dir).forEach((file: string) => {
			let fullPath = path.join(dir, file);
			if (fs.lstatSync(fullPath).isDirectory()) {
				this.mapApis(fullPath);
			} else {
				if (fullPath.endsWith('.json')) {
					this.apis.push(JSON.parse(fs.readFileSync(fullPath, 'utf8')));
				}
			}
		});
	}
}
