import { Test, TestingModule } from '@nestjs/testing';
import { ResponseListDto } from 'src/decorator/dto/response.list.dto';
import { TypeQuestiontype } from '../repository/enum/question.enum';
import { TypeQuestionSubType } from '../repository/enum/question.sub.enum';
import { GetQeustionDto } from './dto/question.dto';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

describe('QuestionController', () => {
  let controller: QuestionController;
  let questionService: jest.Mocked<QuestionService>;

  beforeEach(async () => {
    const mockQuestionService = {
      getList: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: mockQuestionService,
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    questionService = module.get(QuestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getList', () => {
    it('should return question list', async () => {
      const mockQuestions = [
        {
          id: 1,
          content: 'Test question 1',
          sort: 1,
          type: TypeQuestiontype.EI,
          questionSub: [
            {
              id: 1,
              questionId: 1,
              type: TypeQuestionSubType.E,
              content: 'Sub question 1',
            },
            {
              id: 2,
              questionId: 1,
              type: TypeQuestionSubType.I,
              content: 'Sub question 2',
            },
          ],
        },
        {
          id: 2,
          content: 'Test question 2',
          sort: 2,
          type: TypeQuestiontype.NS,
          questionSub: [
            {
              id: 3,
              questionId: 2,
              type: TypeQuestionSubType.S,
              content: 'Sub question 3',
            },
            {
              id: 4,
              questionId: 2,
              type: TypeQuestionSubType.N,
              content: 'Sub question 4',
            },
          ],
        },
      ];

      questionService.getList.mockResolvedValue(mockQuestions);

      const result = await controller.getList();

      expect(result).toBeInstanceOf(ResponseListDto);
      expect(result.data.list).toHaveLength(2);
      expect(result.data.list[0]).toBeInstanceOf(GetQeustionDto);
      expect(questionService.getList).toHaveBeenCalledTimes(1);
    });

    it('should return empty list when no questions exist', async () => {
      questionService.getList.mockResolvedValue([]);

      const result = await controller.getList();

      expect(result).toBeInstanceOf(ResponseListDto);
      expect(result.data.list).toHaveLength(0);
      expect(questionService.getList).toHaveBeenCalledTimes(1);
    });
  });
});