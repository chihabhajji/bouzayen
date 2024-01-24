import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SystemConfig } from '../config/configs/system.config';
import { ConsoleLogger } from '@nestjs/common';
import { capitalize } from '../utils';

function operationIdFactory(controllerKey: string, methodKey: string) {
    // Since crud package uses the same controller for all methods, we need to strip the reserved word from the method name
    const strippedMethodKey = methodKey.replace('reserved', '');
    // optional, so front devs have less verbose names
    const strippedControllerKey = controllerKey.replace('Controller', '');
    return `${strippedControllerKey}${capitalize(strippedMethodKey)}`;
}

export default function initSwagger(app: NestExpressApplication, systemConfig: SystemConfig) {
    const swaggerLogger = new ConsoleLogger('SwaggerSetup');
    /** API Docs Setup */
    if (!systemConfig.isProduction()) {
        swaggerLogger.debug(
            `Swagger is enabled and available at ${systemConfig.publicUrl}docs , yaml at ${systemConfig.publicUrl}docs/yaml`,
        );
        const apiDocsConfig = new DocumentBuilder()
            .setTitle('TN Critic API')
            .setDescription('APIs for TN Shit')
            .setVersion('1.0.0')
            .addBearerAuth()

            .build();

        SwaggerModule.setup(`docs`, app, SwaggerModule.createDocument(app, apiDocsConfig, { operationIdFactory }), {
            customSiteTitle: 'TN Stuff API',
            yamlDocumentUrl: `/docs/yaml`,
        });
    } else {
        swaggerLogger.log(`Swagger is disabled in production mode`);
    }
}
