// noinspection JSUnusedGlobalSymbols

import { setSeederFactory } from 'typeorm-extension';
import { User } from 'public/users/schema/user.entity';
import { Logger } from '@nestjs/common';
import { ERole } from 'public/users/enums/role.enum';
import { UserProfile } from 'public/users/schema/profile.entity';

const userFactoryLogger = new Logger('UserFactory');
export default setSeederFactory(User, (faker) => {
    const sexFlag = faker.number.int(1);
    const sex: 'male' | 'female' = sexFlag ? 'male' : 'female';
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);

    const profile = new UserProfile({
        lastName,
        firstName,
        avatar: faker.image.avatar(),
    });

    const user = new User();
    user.username = faker.internet.userName({
        firstName,
        lastName,
    });
    user.password = faker.internet.password({
        memorable: true,
        length: 8,
    });
    user.email = faker.internet.email({
        firstName,
        lastName,
    });
    user.balance = faker.number.float({
        min: 1,
        max: 9999999,
        precision: 2,
    });
    user.percentage = faker.number.float({
        min: 0,
        max: 1,
        precision: 2,
    });
    user.isActive = Boolean(sexFlag);
    user.role = faker.helpers.enumValue(ERole);
    user.profile = profile;
    import('chalk').then((chalk) => {
        const instance = new chalk.Chalk();
        userFactoryLogger.log(
            `Created ${instance.bold.magenta(user.role)} ${instance.blue(
                user.username,
            )} ${instance.greenBright`with password`} ${instance.bgGray.blue(user.password)}`,
        );
    });
    return user;
});
