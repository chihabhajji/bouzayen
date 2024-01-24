import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { User } from 'public/users/schema/user.entity';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtConfig } from 'common/config/configs/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly jwtConfig: JwtConfig) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConfig.secret,
            jsonWebTokenOptions: { maxAge: jwtConfig.expiresIn, ignoreExpiration: true },
        } as StrategyOptions);
    }

    async validate(payload: Partial<User>) {
        return payload;
    }
}
