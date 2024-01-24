import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from 'public/users/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<[ERole] | ERole>('role', context.getHandler());
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            return false;
        }
        if ([ERole.SUPER_ADMIN].includes(request.user.role)) {
            // for the admin i don't need to check the role
            return true;
        }
        return requiredRoles === request.user.role;
    }
}
