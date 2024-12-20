import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { BadRequestException } from '../common/exceptions/application.exceptions';
import { ResponseUtil } from '../common/utils/response.util';

@Controller('leaderboard')
export class LeaderboardController {
	constructor(private readonly leaderboardService: LeaderboardService) {}

	@Get()
	async getHighestScores() {
		try {
			const scores = await this.leaderboardService.getHighestScores();
			return ResponseUtil.success(scores, 'Highest scores retrieved successfully');
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	@Get('/game')
	async getLeaderboard(@Query('gameName') gameName: string) {
		try {
			const leaderboard = await this.leaderboardService.getLeaderboard(gameName);
			return ResponseUtil.success(leaderboard, 'Game leaderboard retrieved successfully');
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}