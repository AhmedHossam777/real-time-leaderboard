import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from '../score/entities/score.entity';

@Module({
	imports: [TypeOrmModule.forFeature([User, Score])],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}