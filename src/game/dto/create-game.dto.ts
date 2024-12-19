import { IsString, IsOptional } from 'class-validator';

export class CreateGameDto {
	@IsString()
	name: string;

	@IsString()
	@IsOptional()
	description: string;
}