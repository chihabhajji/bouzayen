import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'public/users/schema/user.entity';
import { Logger } from '@nestjs/common';
import { ERole } from 'public/users/enums/role.enum';

// noinspection JSUnusedGlobalSymbols
export default class SeedUsers implements Seeder {
    private readonly logger = new Logger(SeedUsers.name);
    public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        try {
            this.logger.log('Start seeding users...');
            await Promise.all([
                factoryManager.get(User).saveMany(4, {
                    role: ERole.USER,
                }),
                factoryManager.get(User).saveMany(1, {
                    role: ERole.SUPER_ADMIN,
                }),
            ]);
        } catch (e) {
            this.logger.error(e);
            throw new Error('Error while seeding users and their profiles database');
        }
    }
}
