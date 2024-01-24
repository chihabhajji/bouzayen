import { SetMetadata } from '@nestjs/common';
import { ERole } from 'public/users/enums/role.enum';

export const Roles = (authorizedRoles: ERole[]) => SetMetadata('role', authorizedRoles);
