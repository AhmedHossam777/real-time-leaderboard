import {
	Controller,
	Post,
	Body,
	Query,
	UseGuards,
	Get,
	ParseIntPipe,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { GetTopPlayersReportDto } from './dto/get-top-player.dto';

@UseGuards(JWTAuthGuard)
@Controller('score')
export class ScoreController {
	constructor(private readonly scoreService: ScoreService) {}

	@Post()
	create(
		@Body() createScoreDto: CreateScoreDto,
		@CurrentUser() user: User,
		@Query('gameName') gameName: string,
	) {
		createScoreDto.user = user;
		return this.scoreService.submitScore(createScoreDto, gameName);
	}

	@Get()
	getHighestScore(@Query('gameName') gameName: string) {
		return this.scoreService.getHighestScores(gameName);
	}

	@Get('top-players')
	async getTopPlayersReport(
		@Query('gameId') gameId: string,
		@Query('startDate') startDate: string,
		@Query('endDate') endDate: string,
		@Query('limit', ParseIntPipe) limit: number,
	) {
		return await this.scoreService.getTopPlayersReport(
			gameId,
			new Date(startDate),
			new Date(endDate),
			limit,
		);
	}
}