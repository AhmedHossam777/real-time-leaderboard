import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JWTAuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { BadRequestException, UnauthorizedException } from '../common/exceptions/application.exceptions';
import { ResponseUtil } from '../common/utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.signup(createUserDto);
      return ResponseUtil.success(user, 'User registered successfully');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return ResponseUtil.success(result, 'Login successful');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @UseGuards(JWTAuthGuard)
  @Get('/protected')
  async protectedRoute() {
    try {
      return ResponseUtil.success('This is the protected route', 'Access granted');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('/refreshToken')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    try {
      const tokens = await this.authService.refreshToken(refreshToken);
      return ResponseUtil.success(tokens, 'Token refreshed successfully');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @UseGuards(JWTAuthGuard)
  @Post('/logout')
  async logout(@CurrentUser() user: User) {
    try {
      const result = await this.authService.signout(user.id);
      return ResponseUtil.success(result, 'Logout successful');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}