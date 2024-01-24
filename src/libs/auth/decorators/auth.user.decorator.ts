import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const AuthUser = createParamDecorator((property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new UnauthorizedException('Huh');
    return property && user[property] ? user[property] : user;
});
