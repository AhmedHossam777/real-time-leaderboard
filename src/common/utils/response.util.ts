import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseUtil {
	static success<T>(data: T, message = 'Success'): ApiResponse<T> {
		return {
			success: true,
			data,
			message,
		};
	}

	static error(message: string, error?: any): ApiResponse<null> {
		return {
			success: false,
			message,
			error,
		};
	}
}
