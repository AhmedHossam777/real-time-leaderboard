import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';

@Module({
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
