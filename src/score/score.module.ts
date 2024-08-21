import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Game } from '../game/entities/game.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Score, Game])],

	controllers: [ScoreController],
	providers: [ScoreService],
})
export class ScoreModule {}