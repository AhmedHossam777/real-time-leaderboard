import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppDataSource } from './data-source';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { ScoreModule } from './score/score.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRoot(AppDataSource.options),
		AuthModule,
		UserModule,
		GameModule,
		ScoreModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}