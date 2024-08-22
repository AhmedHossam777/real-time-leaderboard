import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JWTAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/signup')
	async signup(@Body() createUserDto: CreateUserDto) {
		return this.authService.signup(createUserDto);
	}

	@Post('/login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@UseGuards(JWTAuthGuard)
	@Get('/protected')
	async protectedRoute() {
		return 'this is the protected route';
	}

	@Post('/refreshToken')
	async refreshToken(@Body('refreshToken') refreshToken: string) {
		return this.authService.refreshToken(refreshToken);
	}
}