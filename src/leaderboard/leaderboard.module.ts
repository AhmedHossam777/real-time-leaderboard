import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaderboard } from './entities/leaderboard.entity';
import { RedisService } from '../redis/redis.service';

@Module({
	imports: [TypeOrmModule.forFeature([Leaderboard])],
	controllers: [LeaderboardController],
	providers: [LeaderboardService, RedisService],
})
export class LeaderboardModule {}