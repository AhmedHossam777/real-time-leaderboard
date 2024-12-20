import { IsString, IsDate, IsNumber, IsArray } from 'class-validator';

export class CreateTournamentDto {
	@IsString()
	name: string;

	@IsDate()
	startDate: Date;

	@IsDate()
	endDate: Date;

	@IsNumber()
	maxParticipants: number;

	@IsArray()
	gameIds: number[];
}
, IsArray, IsDate, IsNumber, IsString
