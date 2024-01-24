import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Environment } from './environment.constants';
import { EnvironmentVariables } from './env.validation';

@Injectable()
export class SecretsService extends ConfigService<EnvironmentVariables> {
    port = parseInt(this.get('PORT') ?? '3000');
    environment = this.get('NODE_ENV') ?? Environment.Development;
}
