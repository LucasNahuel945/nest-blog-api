import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from 'src/access-control/roles.enum';
import { JwtService } from '@nestjs/jwt';

interface DecodedToken { role: UserRole };

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) { super() }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest();

    const authToken = request
      .headers
      .authorization
      .split(' ')[1];

    const decodedToken: DecodedToken = this
      .jwtService
      .decode(authToken) as DecodedToken;

    const { role } = decodedToken;

    return requiredRoles.some((requiredRole) => role === requiredRole);
  }
}