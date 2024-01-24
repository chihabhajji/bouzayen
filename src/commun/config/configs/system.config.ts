import { Injectable } from '@nestjs/common';
import { Environment } from '../environment.constants';

@Injectable()
export class SystemConfig {
    constructor(public readonly publicUrl: string, public readonly port: number, public readonly environment: Environment) {}

    isProduction(): boolean {
        return this.environment === Environment.Production;
    }
    isDevelopment(): boolean {
        return this.environment === Environment.Development;
    }
    isTest(): boolean {
        return this.environment === Environment.Test;
    }
    isStaging(): boolean {
        return this.environment === Environment.Staging;
    }
}
