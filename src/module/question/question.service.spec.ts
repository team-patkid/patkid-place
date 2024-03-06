import sinon, { SinonStubbedInstance } from 'sinon';
import { QuestionEntity } from '../repository/entity/question.entity';
import { QuestionSubEntity } from '../repository/entity/question.sub.entity';
import {
  TypeQuestionStatus,
  TypeQuestiontype,
} from '../repository/enum/question.enum';
import {
  TypeQuestionSubStatus,
  TypeQuestionSubType,
} from '../repository/enum/question.sub.enum';
import { QuestionRepositoryService } from '../repository/service/question.reposistory.service';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;
  let questionRepository: SinonStubbedInstance<QuestionRepositoryService>;

  beforeEach(async () => {
    questionRepository = sinon.createStubInstance(QuestionRepositoryService);
    service = new QuestionService(questionRepository);
  });

  const createQuestionEntity = (ctx: {
    id?: number;
    content?: string;
    sort?: number;
    type?: TypeQuestiontype;
    status?: TypeQuestionStatus;
    dateCreate?: Date;
    dateUpdate?: Date;
    questionSub?: QuestionSubEntity[];
  }): QuestionEntity => {
    const question = new QuestionEntity();
    question.id = ctx.id || 1;
    question.content = ctx.content || 'content';
    question.sort = ctx.sort || 1;
    question.type = ctx.type || TypeQuestiontype.EI;
    question.status = ctx.status || TypeQuestionStatus.NORMAL;
    question.dateCreate = ctx.dateCreate || new Date();
    question.dateUpdate = ctx.dateUpdate || new Date();
    question.questionSub = ctx.questionSub || [];

    return question;
  };

  const createQuestionSubEntity = (ctx: {
    id?: number;
    questionId?: number;
    type?: TypeQuestionSubType;
    content?: string;
    sort?: number;
    status?: TypeQuestionSubStatus;
    dateCreate?: Date;
    dateUpdate?: Date;
  }): QuestionSubEntity => {
    const questionSub = new QuestionSubEntity();
    questionSub.id = ctx.id || 1;
    questionSub.questionId = ctx.questionId || 1;
    questionSub.type = ctx.type || TypeQuestionSubType.J;
    questionSub.content = ctx.content || 'content';
    questionSub.sort = ctx.sort || 1;
    questionSub.status = ctx.status || TypeQuestionSubStatus.NORMAL;
    questionSub.dateCreate = ctx.dateCreate || new Date();
    questionSub.dateUpdate = ctx.dateUpdate || new Date();

    return questionSub;
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of questions', async () => {
    const list = [1, 2, 3, 4, 5].map((i) =>
      createQuestionEntity({
        id: i,
        content: `content${i}`,
        sort: i,
        questionSub: [1, 2, 3, 4, 5].map((j) =>
          createQuestionSubEntity({
            id: j,
            questionId: i,
            content: `content${j}`,
            sort: j,
          }),
        ),
      }),
    );

    const expected = list.map((question) => ({
      id: question.id,
      content: question.content,
      sort: question.sort,
      type: question.type,
      questionSub: question.questionSub.map((sub) => ({
        id: sub.id,
        questionId: sub.questionId,
        type: sub.type,
        content: sub.content,
      })),
    }));

    questionRepository.findAll.resolves(list);

    // Act
    const result = await service.getList();

    // Assert
    expect(result).toEqual(expected);
  });
});
