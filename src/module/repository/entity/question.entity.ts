import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeQuestionStatus } from '../enum/question.enum';
import { QuestionSubEntity } from './question.sub.entity';

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 100 })
  content: string;

  @Column('int')
  sort: number;

  @Column('enum', {
    enum: TypeQuestionStatus,
    default: TypeQuestionStatus.NORMAL,
  })
  status: TypeQuestionStatus;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  dateUpdate: Date;

  @OneToMany(() => QuestionSubEntity, (questionSub) => questionSub.question)
  questionSub: QuestionSubEntity[];
}
