import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';

export class LoginDto {
    @Expose()
    @Type(() => String)
    @ApiProperty({
        type: String,
        description: 'Username of the user',
        minLength: 4,
        maxLength: 20,
    })
    @Transform(({ value }) => value?.toLowerCase()?.trim())
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    @Expose()
    @Type(() => String)
    @ApiProperty({
        type: String,
        description: 'Password of the user',
        minLength: 4,
        maxLength: 20,
    })
    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}
