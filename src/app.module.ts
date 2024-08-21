import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ScoreModule } from './score/score.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { GameModule } from './game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		UserModule,
		ScoreModule,
		LeaderboardModule,
		GameModule,
		AuthModule,
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
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}