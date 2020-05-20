import express, {Application, Request, Response} from 'express';
import { ApiResponseParser } from './ApiResponseParser';

const app: Application = express();
const apiResponseParser: ApiResponseParser = new ApiResponseParser();
const port: number = 3000;

app.use((req: Request, res: Response) => {
	const url = req.url;
	const method = req.method;
	const data = apiResponseParser.getResponse(method, url);
	if (data) {
		res.json(data);
	} else {
		res.status(400).json({
			url: url,
			method: method,
			message: 'no api for current url and method'
		});
	}
});

app.listen(port, () => console.log('Server running, port: ' + port));
