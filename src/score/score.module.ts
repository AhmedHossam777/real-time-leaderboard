import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
