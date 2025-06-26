import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from '../entity/tag.entity';
import { TypeTagStatus } from '../enum/type.enum';
import { TagRepositoryService } from './tag.repository.service';

describe('TagRepositoryService', () => {
  let service: TagRepositoryService;
  let repository: jest.Mocked<Repository<TagEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      createQueryBuilder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagRepositoryService,
        {
          provide: getRepositoryToken(TagEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TagRepositoryService>(TagRepositoryService);
    repository = module.get(getRepositoryToken(TagEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findTagListByPlaceId', () => {
    it('should return tags by place ID', async () => {
      const placeId = 1;
      const mockTags = [
        {
          id: 1,
          placeId: 1,
          tag: 'quiet',
          status: TypeTagStatus.NORMAL,
        },
        {
          id: 2,
          placeId: 1,
          tag: 'cozy',
          status: TypeTagStatus.NORMAL,
        },
      ] as TagEntity[];

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockTags),
      };

      repository.createQueryBuilder.mockReturnValue(mockQueryBuilder as any);

      const result = await service.findTagListByPlaceId(placeId);

      expect(result).toEqual(mockTags);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('tag');
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('tag.place.id = :placeId', { placeId });
    });

    it('should return empty array when no tags found', async () => {
      const placeId = 999;

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([]),
      };

      repository.createQueryBuilder.mockReturnValue(mockQueryBuilder as any);

      const result = await service.findTagListByPlaceId(placeId);

      expect(result).toEqual([]);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('tag');
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('tag.place.id = :placeId', { placeId });
    });
  });
});