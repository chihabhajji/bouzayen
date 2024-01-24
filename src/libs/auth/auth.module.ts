import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import UsersModule from 'public/users/users.module';
import { JwtConfig } from 'common/config/configs/jwt.config';
import { SecretsModule } from 'common/config/secrets.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [SecretsModule],
            inject: [JwtConfig],
            useFactory: (jwtconfig: JwtConfig) => ({
                global: true,
                secret: jwtconfig.secret,
                signOptions: { expiresIn: jwtconfig.expiresIn },
                verifyOptions: { maxAge: jwtconfig.expiresIn, ignoreExpiration: true },
            }),
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
