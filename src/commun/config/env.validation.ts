import { plainToInstance, Type } from 'class-transformer';
import { Environment } from './environment.constants';
import { IsEnum, IsNumber, IsOptional, IsPort, IsString, IsUrl, Length, validateSync } from '@nestjs/class-validator';
import { ConsoleLogger } from '@nestjs/common';

export class EnvironmentVariables {
    @Type(() => EnvironmentVariables)
    @IsEnum(Environment)
    NODE_ENV: Environment = Environment.Development;

    @IsOptional()
    @IsPort()
    PORT = '3000';

    // @IsUrl()
    @IsOptional()
    PUBLIC_URL = 'http://localhost:3000/';

    @IsUrl({
        protocols: ['postgresql'],
    })
    DB_URL: string;

    @IsString()
    JWT_SECRET: string;
    @IsOptional()
    @IsString()
    JWT_EXPIRATION: string;

    @IsUrl({
        require_tld: true,
        require_protocol: true,
        require_valid_protocol: true,
        require_host: true,
        protocols: ['redis'],
    })
    REDIS_URL: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        const validationLogger = new ConsoleLogger('Validation');
        validationLogger.error(errors.toString());
        throw new Error('Validation failed.');
    }
    return validatedConfig;
}
