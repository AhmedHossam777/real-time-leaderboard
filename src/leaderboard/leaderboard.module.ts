import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaderboard } from './entities/leaderboard.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Leaderboard])],
	controllers: [LeaderboardController],
	providers: [LeaderboardService],
})
export class LeaderboardModule {}