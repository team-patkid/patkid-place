import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypePlaceStatus } from '../enum/place.enum';
import { MbtiEntity } from './mbti.entity';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity('place')
export class PlaceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 10 })
  mbtiId: string;

  @Column('varchar', { length: 100, nullable: false })
  name: string;

  @Column('varchar', { length: 4000, nullable: false })
  naverUrl: string;

  @Column('float', { nullable: false })
  x: number;

  @Column('float', { nullable: false })
  y: number;

  @Column('varchar', { length: 4000, nullable: false })
  content: string;

  @Column('varchar', { length: 4000, nullable: false })
  imageUrl: string;

  @Column('enum', {
    enum: TypePlaceStatus,
    default: TypePlaceStatus.NORMAL,
    nullable: false,
  })
  status: TypePlaceStatus;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  dateUpdate: Date;

  @ManyToOne(() => MbtiEntity, (mbtiEntity: MbtiEntity) => mbtiEntity.place, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    createForeignKeyConstraints: process.env.NODE_ENV !== 'test',
  })
  @JoinColumn({ name: 'mbti_id' })
  mbti: MbtiEntity[];

  @OneToMany(() => UserEntity, (userEntity) => userEntity.place)
  user: UserEntity;

  @OneToMany(() => TagEntity, (tagEntity) => tagEntity.place)
  tag: TagEntity;
}
