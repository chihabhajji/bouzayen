import { Injectable, NotAcceptableException, OnApplicationBootstrap } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'public/users/service/users.service';
import { LoginDto } from './dtos/login.dto';
import axios from 'axios';
import { User } from 'public/users/schema/user.entity';
import { GoogleTokenIntrospectionPayload } from './types/google-introspect.type';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.repository.findOneBy({ username });
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && passwordValid) {
            return user;
        }
        return null;
    }

    async login(user: LoginDto) {
        // find the user and check if the password is valid
        const userValid = await this.validateUser(user.username, user.password);
        if (!userValid) {
            throw new NotAcceptableException('username or password is not correct');
        }
        return this.sign({ email: userValid.email, role: userValid.role, username: userValid.username });
    }

    async getGoogleUserInfo(accessToken: string) {
        // technically, the OAuth2Client should be able to do this, but it doesn't work using .request method
        const a = await axios.get<
            Omit<
                GoogleTokenIntrospectionPayload & {
                    verified_email: boolean;
                },
                'iss' | 'at_hash' | 'sub' | 'azp' | 'nonce' | 'profile' | 'exp' | 'iat'
            >
        >('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return a.data;
    }

    sign(payload: Pick<User, 'email' | 'role' | 'username'>) {
        return this.jwtService.sign({
            username: payload.username,
            email: payload.email,
            role: payload.role,
        });
    }
}
