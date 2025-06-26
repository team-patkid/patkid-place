import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { TypeUserStatus } from '../enum/user.enum';
import { UserRepositoryService } from './user.repository.service';

describe('UserRepositoryService', () => {
  let service: UserRepositoryService;
  let repository: jest.Mocked<Repository<UserEntity>>;

  beforeEach(async () => {
    const mockRepository = {
      count: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserRepositoryService>(UserRepositoryService);
    repository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserTotalCount', () => {
    it('should return total user count', async () => {
      const mockCount = 150;
      repository.count.mockResolvedValue(mockCount);

      const result = await service.getUserTotalCount();

      expect(result).toBe(mockCount);
      expect(repository.count).toHaveBeenCalledWith({
        where: { status: TypeUserStatus.NORMAL },
      });
    });
  });

  describe('upsertUser', () => {
    it('should save user', async () => {
      const mockUserData = {
        placeId: 1,
        shareCount: 0,
        status: TypeUserStatus.NORMAL,
      } as UserEntity;

      const mockSavedUser = {
        id: 'test-uuid',
        ...mockUserData,
        dateCreate: new Date(),
        dateUpdate: new Date(),
      } as UserEntity;

      repository.save.mockResolvedValue(mockSavedUser);

      const result = await service.upsertUser(mockUserData);

      expect(result).toEqual(mockSavedUser);
      expect(repository.save).toHaveBeenCalledWith(mockUserData);
    });
  });

  describe('getUser', () => {
    it('should return user when found', async () => {
      const userId = 'test-uuid';
      const mockUser = {
        id: userId,
        placeId: 1,
        shareCount: 0,
        status: TypeUserStatus.NORMAL,
        dateCreate: new Date(),
        dateUpdate: new Date(),
      } as UserEntity;

      repository.findOneBy = jest.fn().mockResolvedValue(mockUser);

      const result = await service.getUser(userId);

      expect(result).toEqual(mockUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: userId });
    });
  });

  describe('getPopularPlaceIdList', () => {
    it('should return popular place ids', async () => {
      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { placeId: 1 },
          { placeId: 2 },
          { placeId: 3 },
        ]),
      };

      repository.createQueryBuilder = jest.fn().mockReturnValue(mockQueryBuilder);

      const result = await service.getPopularPlaceIdList();

      expect(result).toEqual([1, 2, 3]);
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('user');
    });
  });
});