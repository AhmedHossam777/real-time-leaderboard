import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException } from '../exceptions/custom.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		let message = 'Internal server error';
		let error: any = null;

		if (exception instanceof CustomException) {
			status = exception.statusCode;
			message = exception.message;
			error = exception.error;
		} else if (exception instanceof HttpException) {
			status = exception.getStatus();
			message = exception.message;
		} else if (exception instanceof Error) {
			message = exception.message;
		}

		// Log the error (you can implement your logging logic here)
		console.error(exception);

		response.status(status).json({
			statusCode: status,
			message,
			error,
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}
