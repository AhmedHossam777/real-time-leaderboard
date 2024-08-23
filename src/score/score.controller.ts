import { Controller, Post, Body, Query, UseGuards, Get } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

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
}