import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User, UserService } from '../user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      expiresIn: '7 days'
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findOne(payload.sub);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}