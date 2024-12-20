import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { JWTAuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { BadRequestException, NotFoundException } from '../common/exceptions/application.exceptions';
import { ResponseUtil } from '../common/utils/response.util';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JWTAuthGuard, AdminGuard)
  @Post()
  async create(@Body() createGameDto: CreateGameDto) {
    try {
      const game = await this.gameService.create(createGameDto);
      return ResponseUtil.success(game, 'Game created successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const game = await this.gameService.findOne(+id);
      return ResponseUtil.success(game, 'Game found successfully');
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('')
  async findOneByName(@Query('name') name: string) {
    try {
      const game = await this.gameService.findOneByName(name);
      return ResponseUtil.success(game, 'Game found successfully');
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(JWTAuthGuard, AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    try {
      const game = await this.gameService.update(+id, updateGameDto);
      return ResponseUtil.success(game, 'Game updated successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JWTAuthGuard, AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.gameService.remove(+id);
      return ResponseUtil.success(result, 'Game deleted successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}