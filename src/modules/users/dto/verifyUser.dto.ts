import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class VerifyUserDto {
    @IsNotEmpty()
    @IsString()
    token: string;
}
