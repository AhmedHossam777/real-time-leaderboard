import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { BadRequestException, NotFoundException } from '../common/exceptions/application.exceptions';
import { ResponseUtil } from '../common/utils/response.util';

@Serialize(UserDto)
@UseGuards(JWTAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return ResponseUtil.success(user, 'User created successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('')
  async find(@Query('email') email: string) {
    try {
      const user = await this.userService.find(email);
      return ResponseUtil.success(user, 'User found successfully');
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.update(+id, updateUserDto);
      return ResponseUtil.success(user, 'User updated successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.userService.remove(+id);
      return ResponseUtil.success(result, 'User deleted successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('me')
  getCurrentUser(@CurrentUser() user: User) {
    return ResponseUtil.success(user, 'Current user retrieved successfully');
  }

  @Get('/ranking')
  async getRanking(@Query('gameName') gameName: string, @CurrentUser() user: User) {
    try {
      const ranking = await this.userService.getRanking(gameName, user.username);
      return ResponseUtil.success(ranking, 'User ranking retrieved successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('/ranking/:gameName')
  async getRankingByUsername(@Param('gameName') gameName: string) {
    try {
      const topPlayers = await this.userService.getTopPlayers(gameName);
      return ResponseUtil.success(topPlayers, 'Top players retrieved successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}