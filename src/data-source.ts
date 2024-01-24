import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { join, sep } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config();
export const publicDataSourceOptions: PostgresConnectionOptions &
    SeederOptions & {
        autoLoadEntities: boolean;
    } & TypeOrmModuleOptions = {
    url: process.env.DB_URL,
    type: 'postgres',
    port: 5432,
    logger: 'advanced-console',
    logging: process.env.NODE_ENV === 'developement',
    autoLoadEntities: true,
    entities: [`${join(__dirname, 'modules')}${sep}**${sep}entity{.ts,.js}`],
    synchronize: true,
};
// noinspection JSUnusedGlobalSymbols
export const dataSource = new DataSource(publicDataSourceOptions);
