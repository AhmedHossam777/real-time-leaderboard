import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
	providers: [
		{
			provide: 'REDIS_CLIENT',
			useFactory: () => {
				return new Redis({
					password: process.env.REDIS_PASSWORD,
					host: process.env.REDIS_HOST || 'localhost',
					port: Number(process.env.REDIS_PORT) || 6379,
				});
			},
		},
	],
	exports: ['REDIS_CLIENT'],
})
export class RedisModule {}