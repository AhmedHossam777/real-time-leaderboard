import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Game])],
	controllers: [GameController],
	providers: [GameService],
	exports: [GameService, TypeOrmModule],
})
export class GameModule {}