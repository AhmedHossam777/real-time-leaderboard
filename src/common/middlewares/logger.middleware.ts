import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const { method, originalUrl, body } = req;

		console.log(`[${new Date().toISOString()}] ${method} ${originalUrl}`);
		if (Object.keys(body).length) {
			console.log('Request Body:', body);
		}

		// Log response
		const originalSend = res.send;
		res.send = function (body) {
			console.log('Response Body:', body);
			return originalSend.call(this, body);
		};

		next();
	}
}