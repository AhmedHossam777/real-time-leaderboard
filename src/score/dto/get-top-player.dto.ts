import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class GetTopPlayersReportDto {
	@IsString()
	gameId: string;

	@IsDateString()
	startDate: string;

	@IsDateString()
	endDate: string;

	@IsInt()
	@Min(1)
	limit: number;
}