import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MbtiEntity } from '../entity/mbti.entity';
import { TypeMbti, TypeMbtiStatus } from '../enum/mbti.enum';
import { MbtiRepositoryService } from './mbti.repository.service';

describe('MbtiRepositoryService', () => {
  let service: MbtiRepositoryService;
  let repository: jest.Mocked<Repository<MbtiEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MbtiRepositoryService,
        {
          provide: getRepositoryToken(MbtiEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MbtiRepositoryService>(MbtiRepositoryService);
    repository = module.get(getRepositoryToken(MbtiEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMbti', () => {
    it('should return MBTI entity', async () => {
      const mbtiType = TypeMbti.INTJ;
      const mockMbti = {
        id: 1,
        mbti: TypeMbti.INTJ,
        name: 'INTJ',
        status: TypeMbtiStatus.NORMAL,
        dateCreate: new Date(),
        dateUpdate: new Date(),
      } as MbtiEntity;

      repository.findOne.mockResolvedValue(mockMbti);

      const result = await service.getMbti(mbtiType);

      expect(result).toEqual(mockMbti);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { mbti: mbtiType },
      });
    });

    it('should throw error when MBTI not found', async () => {
      const mbtiType = TypeMbti.INTJ;

      repository.findOne.mockResolvedValue(null);

      await expect(service.getMbti(mbtiType)).rejects.toThrow();
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { mbti: mbtiType },
      });
    });
  });
});