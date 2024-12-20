import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppDataSource } from './data-source';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { ScoreModule } from './score/score.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

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
		ThrottlerModule.forRoot([
			{
				ttl: 60, // time window in seconds
				limit: 10, // number of maximum requests in the TTL window
			},
		]),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(LoggerMiddleware)
			.forRoutes({ path: '*', method: RequestMethod.ALL });
	}
}