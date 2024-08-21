import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, UserService, JwtService, RedisService],
	imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}