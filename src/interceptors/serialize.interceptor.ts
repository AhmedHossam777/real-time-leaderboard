import {
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	UseInterceptors,
} from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ClassConstructor {
	new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
	return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
	constructor(private dto: any) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		return next.handle().pipe(
			// data : is the data that we send back in the response
			map((data: any) => {
				return plainToClass(this.dto, data, {
					excludeExtraneousValues: true,
				});
			}),
		);
	}
}