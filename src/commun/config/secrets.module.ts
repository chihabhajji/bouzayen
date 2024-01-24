import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SecretsService } from './secrets.service';
import { JwtConfig } from './configs/jwt.config';
import { validate } from './env.validation';
import { SystemConfig } from './configs/system.config';
import { Environment } from './environment.constants';
import { RedisConfig } from './configs/redis.config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            expandVariables: true,
            validate,
        }),
    ],
    providers: [
        SecretsService,
        {
            provide: SystemConfig,
            inject: [SecretsService],
            useFactory: async (secretsService: SecretsService) =>
                new SystemConfig(
                    (await secretsService.get('PUBLIC_URL')) ?? 'http://localhost:3000',
                    parseInt((await secretsService.get('PORT')) ?? '3000'),
                    (await secretsService.get('NODE_ENV')) ?? Environment.Development,
                ),
        },
        {
            provide: JwtConfig,
            inject: [SecretsService],
            useFactory: async (secretsService: SecretsService) =>
                new JwtConfig(await secretsService.getOrThrow('JWT_SECRET'), (await secretsService.get('JWT_EXPIRATION')) ?? '1d'),
        },

        {
            provide: RedisConfig,
            inject: [SecretsService],
            useFactory: async (secretsService: SecretsService) => new RedisConfig(await secretsService.getOrThrow('REDIS_URL')),
        },
    ],
    exports: [SecretsService, SystemConfig, JwtConfig, RedisConfig],
})
export class SecretsModule {}
