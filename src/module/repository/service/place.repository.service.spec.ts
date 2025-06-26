import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceEntity } from '../entity/place.entity';
import { TypeMbti } from '../enum/mbti.enum';
import { PlaceRepositoryService } from './place.repository.service';
import { UserRepositoryService } from './user.repository.service';

describe('PlaceRepositoryService', () => {
  let service: PlaceRepositoryService;
  let repository: jest.Mocked<Repository<PlaceEntity>>;
  let userRepositoryService: jest.Mocked<UserRepositoryService>;

  beforeEach(async () => {
    const mockRepository = {
      createQueryBuilder: jest.fn(),
      findBy: jest.fn(),
    };

    const mockUserRepositoryService = {
      getPopularPlaceIdList: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlaceRepositoryService,
        {
          provide: getRepositoryToken(PlaceEntity),
          useValue: mockRepository,
        },
        {
          provide: UserRepositoryService,
          useValue: mockUserRepositoryService,
        },
      ],
    }).compile();

    service = module.get<PlaceRepositoryService>(PlaceRepositoryService);
    repository = module.get(getRepositoryToken(PlaceEntity));
    userRepositoryService = module.get(UserRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPlaceByMbti', () => {
    it('should return places by MBTI type', async () => {
      const mbti = TypeMbti.INTJ;
      const mockPlaces = [
        {
          id: 1,
          mbtiId: 1,
          name: 'Test Place 1',
        },
        {
          id: 2,
          mbtiId: 1,
          name: 'Test Place 2',
        },
      ] as PlaceEntity[];

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockPlaces),
      };

      repository.createQueryBuilder.mockReturnValue(mockQueryBuilder as any);

      const result = await service.findPlaceByMbti(mbti);

      expect(result).toEqual(mockPlaces);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('place');
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('mbti.mbti = :mbti', { mbti });
    });
  });

  describe('findHotPlaceList', () => {
    it('should return hot places', async () => {
      const mockPlaceIds = [1, 2, 3];
      const mockPlaces = [
        { id: 1, name: 'Hot Place 1' },
        { id: 2, name: 'Hot Place 2' },
        { id: 3, name: 'Hot Place 3' },
      ] as PlaceEntity[];

      userRepositoryService.getPopularPlaceIdList.mockResolvedValue(mockPlaceIds);
      repository.findBy.mockResolvedValue(mockPlaces);

      const result = await service.findHotPlaceList();

      expect(result).toEqual(mockPlaces);
      expect(userRepositoryService.getPopularPlaceIdList).toHaveBeenCalled();
    });
  });
});