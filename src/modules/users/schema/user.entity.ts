import { ERole } from '../enums/role.enum';
import { BeforeInsert, Column, Entity, Index, JoinColumn, OneToOne, PrimaryColumn, Relation } from 'typeorm';
import { BaseTnCriticEntity } from 'common/db/base.entity';
import { Allow, IsEmail, IsEnum, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { GROUP } from '@nestjs-library/crud';
import { Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import bcrypt from 'bcrypt';
import { UserProfile } from './profile.entity';
import { SubscriptionPack } from '../enums/subscription-pack.enum';

@Entity({
    name: 'users',
})
export class User extends BaseTnCriticEntity {
    @Index({ unique: true })
    @PrimaryColumn()
    @IsString({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.PARAMS, GROUP.SEARCH] })
    @IsOptional({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.SEARCH] })
    username!: string;

    @Index({ unique: true })
    @Column()
    @IsEmail(undefined, { groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.PARAMS, GROUP.SEARCH] })
    @IsOptional({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.SEARCH] })
    @ApiProperty({ type: String, description: 'Email of the user', format: 'email' })
    email!: string;

    @Exclude()
    @IsString({
        groups: [GROUP.CREATE],
    })
    @IsOptional({ always: true })
    @Column({
        nullable: false,
    })
    password: string;

    @IsEnum(ERole, { groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.PARAMS, GROUP.SEARCH] })
    @IsOptional({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.SEARCH] })
    @ApiProperty({ enum: ERole, description: 'Role of the user', type: String })
    @Column({
        type: 'enum',
        enum: ERole,
        default: ERole.USER,
        nullable: false,
    })
    role: ERole;

    @Type(() => Number)
    @IsNumber({ allowNaN: false }, { groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.PARAMS, GROUP.SEARCH] })
    @IsOptional({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.SEARCH] })
    @ApiProperty({ type: Number, description: 'Percentage of the user' })
    @Column({
        default: 0,
        nullable: false,
    })
    percentage: number;

    @Type(() => Boolean)
    @ApiProperty({ type: Boolean, description: 'Is the user active' })
    @IsOptional({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.SEARCH] })
    @IsOptional({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.SEARCH] })
    @Column({
        type: 'boolean',
        default: true,
        nullable: false,
    })
    isActive!: boolean;

    @Type(() => Number)
    @IsNumber({ allowNaN: false }, { groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.PARAMS, GROUP.SEARCH] })
    @IsOptional({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.SEARCH] })
    @ApiProperty({ type: Number, description: 'Balance of the user' })
    @Column({
        default: 0,
        nullable: false,
    })
    balance: number;

    @Type(() => UserProfile)
    @Allow({
        always: true,
    })
    // @IsObject({ always: true })
    @OneToOne(() => UserProfile, {
        eager: true,
        nullable: false,
        cascade: true,
    })
    @JoinColumn()
    profile: Relation<UserProfile>;

    @Allow({
        groups: [GROUP.READ_ONE, GROUP.READ_MANY, GROUP.SEARCH, GROUP.PARAMS],
    })
    @Column({
        nullable: false,
        type: 'varchar',
        enum: SubscriptionPack,
        default: SubscriptionPack.DEMO,
    })
    subscriptionPack: SubscriptionPack = SubscriptionPack.DEMO;
    @BeforeInsert()
    async processPreInsert(password?: string) {
        this.password = await bcrypt.hash(password || this.password, 10);
        this.email = this.email.toLowerCase().trim();
        this.username = this.username.toLowerCase().trim();
    }
}
