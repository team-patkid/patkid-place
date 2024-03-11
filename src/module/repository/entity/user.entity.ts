import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeUserStatus } from '../enum/user.enum';
import { PlaceEntity } from './place.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { name: 'place_id' })
  placeId: number;

  @Column('int', { default: 0, nullable: false })
  shareCount: number;

  @Column('enum', {
    enum: TypeUserStatus,
    default: TypeUserStatus.NORMAL,
    nullable: false,
  })
  status: TypeUserStatus;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  dateUpdate: Date;

  @ManyToOne(() => PlaceEntity, (place: PlaceEntity) => place.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    createForeignKeyConstraints: process.env.NODE_ENV !== 'test',
  })
  @JoinColumn({ name: 'place_id' })
  place: PlaceEntity[];
}
