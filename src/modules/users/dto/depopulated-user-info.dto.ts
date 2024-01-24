import { OmitType } from '@nestjs/swagger';
import { User } from '../schema/user.entity';

export class DepopulatedUserInfoDTO extends OmitType(User, ['password']) {}
