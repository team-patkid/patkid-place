import { plainToClass } from 'class-transformer';
import sinon, { SinonStubbedInstance } from 'sinon';
import { v4 as uuidV4 } from 'uuid';

import { MbtiEntity } from '../repository/entity/mbti.entity';
import { PlaceEntity } from '../repository/entity/place.entity';
import { TagEntity } from '../repository/entity/tag.entity';
import { UserEntity } from '../repository/entity/user.entity';
import { TypeMbti, TypeMbtiStatus } from '../repository/enum/mbti.enum';
import { TypePlaceStatus } from '../repository/enum/place.enum';
import { TypeTagStatus, TypeTagType } from '../repository/enum/type.enum';
import { TypeUserStatus } from '../repository/enum/user.enum';
import { MbtiRepositoryService } from '../repository/service/mbti.repository.service';
import { PlaceRepositoryService } from '../repository/service/place.repository.service';
import { TagRepositoryService } from '../repository/service/tag.repository.service';
import { UserRepositoryService } from '../repository/service/user.repository.service';
import {
  UserResultDto,
  UserResultMbtiDto,
  UserResultPlaceDto,
} from './dto/user.service.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryService: SinonStubbedInstance<UserRepositoryService>;
  let placeRepositoryService: SinonStubbedInstance<PlaceRepositoryService>;
  let tagRepositoryService: SinonStubbedInstance<TagRepositoryService>;
  let mbtiRepositoryService: SinonStubbedInstance<MbtiRepositoryService>;

  beforeEach(async () => {
    userRepositoryService = sinon.createStubInstance(UserRepositoryService);
    placeRepositoryService = sinon.createStubInstance(PlaceRepositoryService);
    tagRepositoryService = sinon.createStubInstance(TagRepositoryService);
    mbtiRepositoryService = sinon.createStubInstance(MbtiRepositoryService);
    service = new UserService(
      userRepositoryService,
      placeRepositoryService,
      tagRepositoryService,
      mbtiRepositoryService,
    );
  });

  const createMbtiEntity = (ctx: {
    id?: number;
    mbti?: TypeMbti;
    name?: string;
    status?: TypeMbtiStatus;
    dateCreate?: Date;
    dateUpdate?: Date;
  }): MbtiEntity => {
    const entity = new MbtiEntity();
    entity.id = ctx.id ?? 1;
    entity.mbti = ctx.mbti ?? TypeMbti.INTJ;
    entity.name = ctx.name ?? 'INTJ';
    entity.status = ctx.status ?? TypeMbtiStatus.NORMAL;
    entity.dateCreate = ctx.dateCreate ?? new Date();
    entity.dateUpdate = ctx.dateUpdate ?? new Date();

    return entity;
  };

  const createPlaceEntity = (ctx: {
    id?: number;
    mbtiId?: TypeMbti;
    name?: string;
    naverUrl?: string;
    x?: number;
    y?: number;
    content?: string;
    imageUrl?: string;
    status?: TypePlaceStatus;
    dateCreate?: Date;
    dateUpdate?: Date;
  }): PlaceEntity => {
    const entity = new PlaceEntity();
    entity.id = ctx.id ?? 1;
    entity.mbtiId = ctx.mbtiId ?? TypeMbti.INTJ;
    entity.name = ctx.name ?? 'name';
    entity.naverUrl = ctx.naverUrl ?? 'naverUrl';
    entity.x = ctx.x ?? 1;
    entity.y = ctx.y ?? 1;
    entity.content = ctx.content ?? 'content';
    entity.imageUrl = ctx.imageUrl ?? 'imageUrl';
    entity.status = ctx.status ?? TypePlaceStatus.NORMAL;
    entity.dateCreate = ctx.dateCreate ?? new Date();
    entity.dateUpdate = ctx.dateUpdate ?? new Date();

    return entity;
  };

  const createTagEntity = (ctx: {
    id?: number;
    placeId?: number;
    tag?: string;
    type?: TypeTagType;
    status?: TypeTagStatus;
    dateCreate?: Date;
    dateUpdate?: Date;
  }): TagEntity => {
    const entity = new TagEntity();
    entity.id = ctx.id ?? 1;
    entity.placeId = ctx.placeId ?? 1;
    entity.tag = ctx.tag ?? 'tag';
    entity.type = ctx.type ?? TypeTagType.ADDRESS;
    entity.status = ctx.status ?? TypeTagStatus.NORMAL;
    entity.dateCreate = ctx.dateCreate ?? new Date();
    entity.dateUpdate = ctx.dateUpdate ?? new Date();

    return entity;
  };

  const createUserEntity = (ctx: {
    id?: string;
    placeId?: number;
    shareUrl?: string;
    status?: TypeUserStatus;
    dateCreate?: Date;
    dateUpdate?: Date;
  }): UserEntity => {
    const entity = new UserEntity();
    entity.id = ctx.id ?? uuidV4();
    entity.placeId = ctx.placeId ?? 1;
    entity.shareUrl = ctx.shareUrl;
    entity.status = ctx.status ?? TypeUserStatus.NORMAL;
    entity.dateCreate = ctx.dateCreate ?? new Date();
    entity.dateUpdate = ctx.dateUpdate ?? new Date();

    return entity;
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the total count of users', async () => {
    // Arrange
    const totalCount = 10;
    userRepositoryService.getUserTotalCount.resolves(totalCount);

    // Act
    const result = await service.getTotalCount();

    // Assert
    expect(result).toBe(totalCount);
  });

  it('should return the user result', async () => {
    // Arrange
    const mbti = TypeMbti.INTJ;
    const mbtiEntity = createMbtiEntity({ mbti });
    const placeId = 2;
    const placeList = [1].map((i) =>
      createPlaceEntity({ id: i, mbtiId: mbti }),
    );
    const tagList = [1, 2, 3].map((i) => createTagEntity({ id: i, placeId }));
    const user = createUserEntity({
      placeId,
      shareUrl: 'https://place.patkid.kr',
    });
    const popularPlaceList = [4, 5, 6].map((i) =>
      createPlaceEntity({ id: i, mbtiId: mbti }),
    );

    mbtiRepositoryService.getMbti.resolves(mbtiEntity);
    placeRepositoryService.findPlaceByMbti.resolves(placeList);
    tagRepositoryService.findTagListByPlaceId.resolves(tagList);
    userRepositoryService.upsertUser.resolves(user);
    placeRepositoryService.findHotPlaceList.resolves(popularPlaceList);

    const expectedResult = plainToClass(UserResultDto, {
      result: plainToClass(UserResultMbtiDto, {
        userId: user.id,
        name: mbtiEntity.name,
        place: UserResultPlaceDto.from(placeList[0], tagList),
      }),
      hotPlace: popularPlaceList.map((place) =>
        UserResultPlaceDto.from(place, tagList),
      ),
      isShare: user.shareUrl !== null,
    });

    console.log('expectedResult :::', expectedResult);

    // Act
    const result = await service.resultUser(mbti);

    console.log('result :::', result);
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
