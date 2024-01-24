import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { IsDateString, IsOptional } from '@nestjs/class-validator';
import { GROUP } from '@nestjs-library/crud';

export abstract class BaseTnCriticEntity extends BaseEntity {
    @IsDateString(undefined, {
        groups: [GROUP.READ_MANY, GROUP.READ_ONE],
    })
    @IsOptional({ groups: [GROUP.READ_MANY, GROUP.READ_ONE] })
    @Type(() => Date)
    @CreateDateColumn()
    @ApiProperty({ type: Date, format: 'date-time' })
    declare readonly createdAt?: Date;

    @IsDateString(undefined, {
        groups: [GROUP.READ_MANY, GROUP.READ_ONE],
    })
    @IsOptional({ groups: [GROUP.READ_MANY, GROUP.READ_ONE] })
    @UpdateDateColumn()
    @Type(() => Date)
    @ApiProperty({ type: Date, format: 'date-time' })
    declare readonly updatedAt?: Date;

    @IsOptional({ always: true })
    @DeleteDateColumn({
        type: 'timestamp',
        nullable: true,
    })
    @IsDateString(undefined, {
        groups: [GROUP.READ_MANY, GROUP.READ_ONE, GROUP.SEARCH, GROUP.PARAMS],
    })
    @Type(() => Date)
    @ApiProperty({ type: Date, format: 'date-time' })
    declare readonly deletedAt?: Date;
}
