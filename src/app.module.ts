import { Module } from '@nestjs/common';
import UsersModule from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { SecretsModule } from 'common/config/secrets.module';
import { AuthModule } from 'libs/auth/auth.module';
import { publicDataSourceOptions } from './data-source';
import { HealthCheckController } from './health-check.controller';
import { RedisModule, RedisModuleOptions, RedisService } from '@songkeys/nestjs-redis';
import { RedisConfig } from 'common/config/configs/redis.config';
import { BullModule } from '@nestjs/bull';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { FeedbackModule } from 'public/feedback/feedback.module';
import { ProductsModule } from 'public/product/product.module';

@Module({
    imports: [
        SecretsModule,
        TypeOrmModule.forRoot(publicDataSourceOptions),
        RedisModule.forRootAsync({
            imports: [SecretsModule],
            inject: [RedisConfig],
            useFactory: (config: RedisConfig): RedisModuleOptions => ({
                config: {
                    url: config.url,
                    enableReadyCheck: false,
                    maxRetriesPerRequest: undefined,
                },
            }),
        }),
        BullModule.forRootAsync({
            inject: [RedisService],
            useFactory: (config: RedisService) => {
                return {
                    redis: config.getClient().options,
                    attempts: 3,
                    defaultJobOptions: {
                        attempts: 3,
                        delay: 1000,
                    },
                    backoff: {
                        type: 'exponential',
                        delay: 1000,
                    },
                };
            },
        }),
        BullBoardModule.forRoot({
            route: '/queues',
            adapter: ExpressAdapter,
        }),
        // public
        UsersModule,
        ProductsModule,
        FeedbackModule,
        // auth
        AuthModule,
        // multi tenaned
        TerminusModule,
    ],
    controllers: [HealthCheckController],
    providers: [
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard,
        // },
    ],
})
export class AppModule {}
