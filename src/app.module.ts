import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ScoreModule } from './score/score.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { GameModule } from './game/game.module';
import { RedisModule } from './redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
	imports: [
		UserModule,
		ScoreModule,
		LeaderboardModule,
		GameModule,
		RedisModule,
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			database: process.env.DB_NAME,
			port: process.env.DB_PORT as any,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_HOST,
			synchronize: true,
			autoLoadEntities: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}