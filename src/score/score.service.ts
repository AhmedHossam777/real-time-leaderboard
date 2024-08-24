import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { Score } from './entities/score.entity';
import { DataSource, Repository } from 'typeorm';
import { RedisService } from '../redis/redis.service';
import { InjectRepository } from '@nestjs/typeorm';
import { GameService } from '../game/game.service';

@Injectable()
export class ScoreService {
	constructor(
		@InjectRepository(Score) private readonly scoreRepo: Repository<Score>,
		private readonly redisService: RedisService,
		private readonly dataSource: DataSource,
		private readonly gameService: GameService,
	) {}

	async submitScore(createScoreDto: CreateScoreDto, gameName: string) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			// Normal postgres
			createScoreDto.game = await this.gameService.findOneByName(gameName);
			const score = this.scoreRepo.create({
				score: createScoreDto.score,
				user: createScoreDto.user,
				game: createScoreDto.game,
			});

			await queryRunner.manager.save(score);

			// Redis
			const leaderboard = `leaderboard:game: ${gameName}`;

			await this.redisService.addScore(
				leaderboard,
				createScoreDto.score,
				`user:${createScoreDto.user.username}`,
			);

			await queryRunner.commitTransaction();
		} catch (e) {
			console.log(e);
			await queryRunner.rollbackTransaction();
			throw new Error('Transaction failed. Rolled back.');
		} finally {
			await queryRunner.release();
		}

		return 'score submitted';
	}

	async getHighestScores(gameName: string) {
		return await this.redisService.getHighestScore(
			`leaderboard:game: ${gameName}`,
		);
	}

	async getTopPlayersReport(
		gameId: string,
		startDate: Date,
		endDate: Date,
		limit: number,
	) {
		return await this.scoreRepo
			.createQueryBuilder('score')
			.select(
				'score.userId,' +
					' SUM(score.score) as totalScore,' +
					' COUNT(score.id) as totalGames,' +
					' ROUND(AVG(score.score),2) as averageScore,' +
					' game.name as gameName',
			)
			.innerJoin('score.game', 'game')
			.where('score.gameId = :gameId', { gameId })
			.andWhere('score.createdAt BETWEEN :startDate AND :endDate', {
				startDate,
				endDate,
			})
			.groupBy('score.userId, game.name')
			.orderBy('totalScore', 'DESC')
			.limit(limit)
			.getRawMany();
	}
}