import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Put,
    SerializeOptions,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dtos/login.dto';
import { User } from 'public/users/schema/user.entity';
import { UsersService } from 'public/users/service/users.service';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorators/skipAuth.decorator';
import { RegisterDto } from 'public/users/dto/signup.dto';
import { JwtAuthGuard } from './guards/auth-jwt.guard';
import { AuthUser } from './decorators/auth.user.decorator';
import { GROUP } from '@nestjs-library/crud';
import bcrypt from 'bcrypt';
import { GoogleLoginDTO } from './dtos/google-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly usersService: UsersService) {}
    @SkipAuth()
    @UsePipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    )
    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<string> {
        return await this.authService.login(loginDto);
    }
    @SkipAuth()
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({
        type: User,
    })
    @Post('/register')
    async createUser(@Body() signupDto: RegisterDto): Promise<User> {
        return await this.usersService.createUser(
            {
                email: signupDto.email,
                password: signupDto.password,
                username: signupDto.username,
            },
            {
                firstName: signupDto.firstName,
                lastName: signupDto.lastName,
            },
        );
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({
        groups: [GROUP.READ_ONE],
    })
    @Get('me')
    async getProfile(@AuthUser() user: { username: string; role: string }): Promise<User> {
        return this.usersService.repository.findOneOrFail({
            where: {
                username: user.username,
            },
            relations: ['memberOrganizations', 'profile', 'organizations'],
        });
    }
    @SkipAuth()
    @Put('google')
    async loginRegisterWithGoogle(@Body() { access_token }: GoogleLoginDTO): Promise<string> {
        const payload = await this.authService.getGoogleUserInfo(access_token);
        if (!payload.email || !payload.verified_email) {
            throw new BadRequestException('INVALID EMAIL');
        }

        const user = await this.usersService.repository.findOne({ where: { email: payload.email }, relations: [] });
        if (user) {
            return this.authService.sign({
                email: user.email,
                role: user.role,
                username: user.username,
            });
        } else {
            const publicUser = await this.usersService.createUser(
                {
                    email: payload.email,
                    username: payload.email,
                    password: bcrypt.hashSync(payload.email, 10),
                },
                {
                    firstName: payload.given_name ?? payload.name ?? payload.email,
                    lastName: payload.family_name ?? payload.name ?? payload.email,
                    avatar: payload.picture,
                },
            );

            return this.authService.sign({
                email: publicUser.email,
                role: publicUser.role,
                username: publicUser.username,
            });
        }
    }
}
