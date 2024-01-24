import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';

export class UpdateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    firstName!: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    lastName!: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password!: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    email!: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username!: string;
}
