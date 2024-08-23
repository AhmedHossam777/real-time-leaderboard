import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
	constructor(private readonly leaderboardService: LeaderboardService) {}

	@Get()
	async getHighestScores() {
		return await this.leaderboardService.getHighestScores();
	}

	@Get('/game')
	async getLeaderboard(@Query('gameName') gameName: string) {
		return await this.leaderboardService.getLeaderboard(gameName);
	}
}