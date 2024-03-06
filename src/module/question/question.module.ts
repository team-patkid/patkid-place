import { Module } from '@nestjs/common';
import { RepositoryModule } from '../repository/repository.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [RepositoryModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
