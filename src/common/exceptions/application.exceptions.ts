import { CustomException } from './custom.exception';

export class NotFoundException extends CustomException {
	constructor(message = 'Resource not found') {
		super(message, 404);
	}
}

export class BadRequestException extends CustomException {
	constructor(message = 'Bad request') {
		super(message, 400);
	}
}

export class UnauthorizedException extends CustomException {
	constructor(message = 'Unauthorized') {
		super(message, 401);
	}
}

export class ForbiddenException extends CustomException {
	constructor(message = 'Forbidden') {
		super(message, 403);
	}
}

export class ValidationException extends CustomException {
	constructor(errors: any) {
		super('Validation failed', 422, errors);
	}
}
