import { IsNumber, IsString, Max, MaxLength, Min } from '@nestjs/class-validator';
import { BaseTnCriticEntity } from 'common/db/base.entity';
import { ProductEntity } from 'public/product/product.entity';
import { User } from 'public/users/schema/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('user-feedback')
export class UserFeedbackEntity extends BaseTnCriticEntity {
    @Column()
    @Max(5)
    @Min(0)
    @IsNumber({
        maxDecimalPlaces: 1,
        allowNaN: false,
        allowInfinity: false,
    })
    rating: number;

    @Column()
    @IsString()
    @MaxLength(800)
    text: string;
    @PrimaryColumn({ type: String })
    @ManyToOne(() => User, {
        cascade: true,
        eager: false,
        lazy: true,
    })
    @JoinColumn()
    public user!: User;

    @PrimaryColumn({ type: String })
    @ManyToOne(() => ProductEntity, {
        eager: false,
        lazy: true,
        cascade: false,
    })
    @JoinColumn()
    public product!: ProductEntity;
}
