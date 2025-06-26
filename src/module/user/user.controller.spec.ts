import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { ResponseDataDto } from 'src/decorator/dto/response-data.dto';
import { TypeMbti } from '../repository/enum/mbti.enum';
import { TypeTagType } from '../repository/enum/type.enum';
import {
  GetTotalCountResponse,
  UserResultResponse,
} from './dto/user.controller.dto';
import { GetUserResultRequest } from './dto/user.service.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: jest.Mocked<UserService>;

  beforeEach(async () => {
    const mockUserService = {
      getTotalCount: jest.fn(),
      resultUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTotalVisitCount', () => {
    it('should return total count', async () => {
      const mockCount = 100;
      userService.getTotalCount.mockResolvedValue(mockCount);

      const result = await controller.getTotalVisitCount();

      expect(result).toBeInstanceOf(ResponseDataDto);
      expect(result.data).toEqual(
        plainToClass(GetTotalCountResponse, { count: mockCount }),
      );
      expect(userService.getTotalCount).toHaveBeenCalledTimes(1);
    });
  });

  describe('postUserResult', () => {
    it('should return user result', async () => {
      const mockRequest: GetUserResultRequest = {
        mbti: TypeMbti.INTJ,
      };

      const mockUserResult = {
        result: {
          userId: 'test-uuid',
          name: 'INTJ',
          place: {
            placeId: 1,
            name: 'Test Place',
            naverUrl: 'https://naver.com',
            content: 'Test content',
            imageUrl: 'https://image.com',
            x: 127.123456,
            y: 37.123456,
            tags: [
              {
                tagId: 1,
                tag: 'quiet',
                type: TypeTagType.ADDRESS,
              },
            ],
          },
        },
        hotPlace: [
          {
            placeId: 2,
            name: 'Hot Place',
            naverUrl: 'https://naver.com/hot',
            content: 'Hot content',
            imageUrl: 'https://image.com/hot',
            x: 127.654321,
            y: 37.654321,
            tags: [
              {
                tagId: 2,
                tag: 'popular',
                type: TypeTagType.NAME,
              },
            ],
          },
        ],
      };

      userService.resultUser.mockResolvedValue(mockUserResult);

      const result = await controller.postUserResult(mockRequest);

      expect(result).toBeInstanceOf(ResponseDataDto);
      expect(result.data).toBeInstanceOf(UserResultResponse);
      expect(userService.resultUser).toHaveBeenCalledWith(mockRequest.mbti);
    });
  });
});