import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { User } from './schema/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './schema/profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserProfile])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export default class UsersModule {}
