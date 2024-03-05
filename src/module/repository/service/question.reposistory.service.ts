import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../entity/question.entity';

@Injectable()
export class QuesstionRepositoryService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async findAll(): Promise<QuestionEntity[]> {
    return this.questionRepository.find({
      relations: ['questionSub'],
      order: { id: 'ASC' },
    });
  }
}