import {
	Injectable,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
	handleRequest(err: any, user: any, info: any, context: ExecutionContext): any {
		if (err || !user) {
			throw err || new UnauthorizedException('Unauthorized');
		}
		if (!user.admin) {
			throw new UnauthorizedException('Unauthorized');
		}
		return user;
	}
}