import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtConfig {
    constructor(public readonly secret: string, public readonly expiresIn: string | number) {}
}
