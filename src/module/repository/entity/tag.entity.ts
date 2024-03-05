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
import { TypeTagStatus, TypeTagType } from '../enum/type.enum';
import { PlaceEntity } from './place.entity';

@Entity('tag')
export class TagEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int', { name: 'place_id' })
  placeId: number;

  @Column('varchar', { length: 100 })
  tag: string;

  @Column('enum', { enum: TypeTagType })
  type: TypeTagType;

  @Column('enum', {
    enum: TypeTagStatus,
    default: TypeTagStatus.NORMAL,
    nullable: true,
  })
  status: TypeTagStatus;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  dateUpdate: Date;

  @ManyToOne(() => PlaceEntity, (placeEntity: PlaceEntity) => placeEntity.tag, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    createForeignKeyConstraints: process.env.NODE_ENV !== 'test',
  })
  @JoinColumn({ name: 'place_id' })
  place: PlaceEntity[];
}
