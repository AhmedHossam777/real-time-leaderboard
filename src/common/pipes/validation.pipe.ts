import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationException } from '../exceptions/application.exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}

		const object = plainToClass(metatype, value);
		const errors = await validate(object);

		if (errors.length > 0) {
			const formattedErrors = errors.reduce((acc, err) => {
				acc[err.property] = Object.values(err.constraints);
				return acc;
			}, {});

			throw new ValidationException(formattedErrors);
		}

		return value;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
