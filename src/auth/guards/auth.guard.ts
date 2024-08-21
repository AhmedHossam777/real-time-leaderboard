import {
	Injectable,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
	handleRequest(err, user, info, context: ExecutionContext) {
		if (err || !user) {
			throw err || new UnauthorizedException('Unauthorized');
		}
		return user;
	}
}