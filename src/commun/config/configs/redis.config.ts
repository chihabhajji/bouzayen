import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisConfig {
    constructor(public readonly url: string) {}
}
