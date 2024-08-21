import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from '../score/entities/score.entity';
import { RedisModule } from '../redis.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Score]),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '15m' },
		}),
		RedisModule,
	],
	controllers: [UserController],
	providers: [UserService, AuthService],
})
export class UserModule {}