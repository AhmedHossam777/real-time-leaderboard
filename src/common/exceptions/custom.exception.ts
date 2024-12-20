export class CustomException extends Error {
	constructor(
		public readonly message: string,
		public readonly statusCode: number,
		public readonly error?: any,
	) {
		super(message);
	}
}
