import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import initSwagger from './commun/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConsoleLogger } from '@nestjs/common';
import { SystemConfig } from 'common/config/configs/system.config';

const logger = new ConsoleLogger('Bootstrap');

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'fatal', 'warn'],
        cors: {
            origin: '*',
        },
    });
    // End Multi tenancy
    app.setGlobalPrefix('/api');
    const systemConfig = app.get(SystemConfig);
    initSwagger(app, systemConfig);
    await app.enableShutdownHooks().listen(3000);
    logger.log(`Application is running on: ${systemConfig.publicUrl}docs`);
}

bootstrap();
