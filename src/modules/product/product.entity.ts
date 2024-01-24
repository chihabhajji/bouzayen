import { IsOptional, IsString } from '@nestjs/class-validator';
import { BaseTnCriticEntity } from 'common/db/base.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import slugify from 'slugify';
import { ApiProperty } from '@nestjs/swagger';
import { GROUP } from '@nestjs-library/crud';
import { UserFeedbackEntity } from 'public/feedback/user-feedback.entity';
@Entity('products')
export class ProductEntity extends BaseTnCriticEntity {
    @PrimaryColumn()
    @IsOptional({ groups: [GROUP.CREATE] })
    @IsString({ always: true })
    slug: string;
    @ApiProperty({ required: false, description: 'The logo url', type: String })
    @Column({ nullable: true })
    @IsOptional({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.READ_MANY, GROUP.UPSERT, GROUP.SEARCH] })
    public logo?: string;

    @ApiProperty({ type: String, description: 'Libelle' })
    @Column({ nullable: true })
    @IsString({ groups: [GROUP.CREATE, GROUP.UPDATE, GROUP.UPSERT, GROUP.PARAMS] })
    @IsOptional({ groups: [GROUP.READ_MANY, GROUP.READ_ONE] })
    public description?: string;

    @ApiProperty({ type: String, description: 'Name' })
    @Column({ nullable: false })
    @IsString({ always: true })
    public name: string;

    @OneToMany(() => UserFeedbackEntity, (userFeedBack) => userFeedBack.product)
    public userFeedBacks: Array<UserFeedbackEntity>;

    @BeforeInsert()
    makeSlug() {
        this.slug = slugify(this.name, {
            trim: true,
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        });
    }
}
