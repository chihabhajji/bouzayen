import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiOAuth2, ApiQuery, ApiTags, OmitType } from '@nestjs/swagger';
import { User } from '../schema/user.entity';
import { UsersService } from '../service/users.service';
import { Crud, Method } from '@nestjs-library/crud';
import { DepopulatedUserInfoDTO } from '../dto/depopulated-user-info.dto';
import { ERole } from '../enums/role.enum';

@ApiTags('users')
@ApiBearerAuth()
@ApiOAuth2(['email', 'profile'])
@Crud({
    entity: User,
    routes: {
        readMany: {
            relations: ['profile'],
            paginationType: 'offset',
            numberOfTake: 10,
            softDelete: false,
            sort: 'ASC',
            swagger: {
                response: DepopulatedUserInfoDTO,
            },
            decorators: [ApiQuery({ name: 'role', type: String, enum: ERole })],
            exclude: ['password', '_id', 'deletedAt'],
        },
        readOne: {
            exclude: ['password'],
            relations: ['profile', 'organizations', 'memberOrganizations'],
            swagger: {
                response: OmitType(User, ['password', 'deletedAt']),
            },
        },
        search: {
            relations: ['profile'],
            paginationType: 'offset',
            numberOfTake: 10,
            swagger: {
                response: DepopulatedUserInfoDTO,
            },
            exclude: ['password', '_id', 'deletedAt'],
        },
    },
    only: [Method.READ_MANY, Method.READ_ONE, Method.UPDATE, Method.SEARCH],
})
@Controller('users')
export class UsersController {
    // noinspection JSUnusedLocalSymbols
    constructor(private readonly crudService: UsersService) {}
}
