import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity } from '../entity/question.entity';
import { TypeQuestionStatus } from '../enum/question.enum';
import { QuestionRepositoryService } from './question.reposistory.service';

describe('QuestionRepositoryService', () => {
  let service: QuestionRepositoryService;
  let repository: jest.Mocked<Repository<QuestionEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionRepositoryService,
        {
          provide: getRepositoryToken(QuestionEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<QuestionRepositoryService>(QuestionRepositoryService);
    repository = module.get(getRepositoryToken(QuestionEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all questions with sub-questions', async () => {
      const mockQuestions = [
        {
          id: 1,
          content: 'Test question 1',
          sort: 1,
          status: TypeQuestionStatus.NORMAL,
          questionSub: [],
        },
        {
          id: 2,
          content: 'Test question 2',
          sort: 2,
          status: TypeQuestionStatus.NORMAL,
          questionSub: [],
        },
      ] as QuestionEntity[];

      repository.find.mockResolvedValue(mockQuestions);

      const result = await service.findAll();

      expect(result).toEqual(mockQuestions);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['questionSub'],
        order: { sort: 'ASC', questionSub: { sort: 'ASC' } },
      });
    });

    it('should return empty array when no questions found', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['questionSub'],
        order: { sort: 'ASC', questionSub: { sort: 'ASC' } },
      });
    });
  });
});