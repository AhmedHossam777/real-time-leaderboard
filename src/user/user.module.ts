import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';

@Module({
	imports: [TypeOrmModule.forFeature([User]), RedisModule],
	controllers: [UserController],
	providers: [UserService, RedisService],
})
export class UserModule {}