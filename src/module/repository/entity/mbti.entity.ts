import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeMbtiStatus } from '../enum/mbti.enum';
import { PlaceEntity } from './place.entity';

@Entity('mbti')
export class MbtiEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 10 })
  mbti: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('enum', { enum: TypeMbtiStatus, default: TypeMbtiStatus.NORMAL })
  status: TypeMbtiStatus;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  dateUpdate: Date;

  @OneToMany(() => PlaceEntity, (place) => place.mbti)
  place: PlaceEntity;
}
