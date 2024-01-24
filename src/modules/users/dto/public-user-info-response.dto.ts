import { OmitType } from '@nestjs/swagger';
import { User } from '../schema/user.entity';

export class PublicUserInfoResponseDTO extends OmitType(User, ['password', 'isActive', 'balance']) {}
