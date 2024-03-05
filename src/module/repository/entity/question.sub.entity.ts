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
import { TypeQuestionSubStatus } from '../enum/question.sub.enum';
import { QuestionEntity } from './question.entity';

@Entity('question_sub')
export class QuestionSubEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  questionId: number;

  @Column('varchar', { length: 10 })
  type: string;

  @Column('varchar', { length: 100 })
  content: string;

  @Column('int')
  sort: string;

  @Column('enum', {
    enum: TypeQuestionSubStatus,
    default: TypeQuestionSubStatus.NORMAL,
  })
  status: TypeQuestionSubStatus;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  dateUpdate: Date;

  @ManyToOne(() => QuestionEntity, (question) => question.questionSub, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    createForeignKeyConstraints: process.env.NODE_ENV !== 'test',
  })
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}
