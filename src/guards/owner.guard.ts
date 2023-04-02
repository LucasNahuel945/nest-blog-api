import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

interface DecodedToken { user_id: number };

@Injectable()
export class OwnerGuard extends AuthGuard('jwt') implements CanActivate {
  constructor( private jwtService: JwtService) { super() }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(authToken);

    if (!decodedToken) {
      throw new UnauthorizedException();
    }

    const { user_id } :DecodedToken = decodedToken as DecodedToken;
    const resourceId = request.params.user_id;

    if (user_id !== resourceId) {
      throw new UnauthorizedException();
    }

    return true;
  }
}