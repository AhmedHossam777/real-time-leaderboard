import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@Serialize(UserDto)
@UseGuards(JWTAuthGuard)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.userService.findOne(+id);
	// }

	@Get('')
	find(@Query('email') email: string) {
		return this.userService.find(email);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}

	@Get('me')
	getCurrentUser(@CurrentUser() user: User) {
		return user;
	}

	@Get('/ranking')
	getRanking(@Query('gameName') gameName: string, @CurrentUser() user: User) {
		console.log(`username: ${user.username}`);

		return this.userService.getRanking(gameName, user.username);
	}

	@Get('/ranking/:gameName')
	getRankingByUsername(@Param('gameName') gameName: string) {
		return this.userService.getTopPlayers(gameName);
	}
}