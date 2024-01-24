import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional, IsString } from "@nestjs/class-validator";
import { GROUP } from "@nestjs-library/crud";
import { ApiProperty } from "@nestjs/swagger";
import { BaseTnCriticEntity } from "common/db/base.entity";

@Entity({
  name: "user_profile",
})
export class UserProfile extends BaseTnCriticEntity {
  @PrimaryGeneratedColumn()
  declare readonly id: number;

  @IsOptional({
    groups: [
      GROUP.CREATE,
      GROUP.UPDATE,
      GROUP.READ_MANY,
      GROUP.UPSERT,
      GROUP.SEARCH,
    ],
  })
  @ApiProperty({ type: String, description: "User avatar" })
  @IsString({
    groups: [
      GROUP.CREATE,
      GROUP.UPDATE,
      GROUP.READ_MANY,
      GROUP.UPSERT,
      GROUP.PARAMS,
      GROUP.SEARCH,
    ],
  })
  @Column({ type: "varchar", nullable: true, default: null })
  avatar?: string;

  @Column({ nullable: true, default: null })
  @IsString({
    groups: [
      GROUP.CREATE,
      GROUP.UPDATE,
      GROUP.READ_MANY,
      GROUP.UPSERT,
      GROUP.PARAMS,
      GROUP.SEARCH,
    ],
  })
  @IsOptional({
    groups: [
      GROUP.CREATE,
      GROUP.UPDATE,
      GROUP.READ_MANY,
      GROUP.UPSERT,
      GROUP.SEARCH,
    ],
  })
  lastName?: string;

  @Column({ nullable: true, default: null })
  @IsString({
    groups: [
      GROUP.CREATE,
      GROUP.UPDATE,
      GROUP.READ_MANY,
      GROUP.UPSERT,
      GROUP.PARAMS,
      GROUP.SEARCH,
    ],
  })
  @IsOptional({
    groups: [
      GROUP.CREATE,
      GROUP.UPDATE,
      GROUP.READ_MANY,
      GROUP.UPSERT,
      GROUP.SEARCH,
    ],
  })
  firstName?: string;

  constructor(partial: Partial<UserProfile>) {
    super();
    Object.assign(this, partial);
  }
}
