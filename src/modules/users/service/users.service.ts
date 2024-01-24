import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../schema/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '@nestjs-library/crud';
import { ERole } from '../enums/role.enum';
import { UserProfile } from '../schema/profile.entity';

@Injectable()
export class UsersService extends CrudService<User> {
    constructor(
        @InjectRepository(User)
        readonly repository: Repository<User>,
        @InjectRepository(UserProfile)
        readonly userProfileRepository: Repository<UserProfile>,
    ) {
        super(repository);
    }

    async createUser(
        registerDto: Pick<User, 'email' | 'username' | 'password'>,
        profileInfo: Pick<UserProfile, 'lastName' | 'firstName' | 'avatar'>,
    ): Promise<User> {
        const findUser = await this.repository.findOne({
            where: [{ email: registerDto.email }, { username: registerDto.username }],
        });
        if (findUser) {
            throw new ConflictException('User already exists'); // 409 Conflict
        }

        const profile = await this.userProfileRepository.save(new UserProfile(profileInfo));

        return await this.repository.save({
            ...registerDto,
            role: ERole.USER,
            balance: 0,
            isActive: true,
            percentage: 0,
            profile,
        });
    }
}
