import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '../redis/redis.module';

@Module({
	imports: [TypeOrmModule.forFeature([User]), RedisModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}