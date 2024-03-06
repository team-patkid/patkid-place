import { Injectable } from '@nestjs/common';
import { QuestionRepositoryService } from '../repository/service/question.reposistory.service';
import { GetQeustionServiceDto } from './dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepositoryService) {}

  async getList(): Promise<GetQeustionServiceDto[]> {
    const list = await this.questionRepository.findAll();

    return list.map((question) =>
      GetQeustionServiceDto.from({
        id: question.id,
        content: question.content,
        sort: question.sort,
        questionSub: question.questionSub.map((sub) => ({
          id: sub.id,
          questionId: sub.questionId,
          type: sub.type,
          content: sub.content,
        })),
      }),
    );
  }
}
