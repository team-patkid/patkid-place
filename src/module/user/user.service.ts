import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../repository/entity/user.entity';
import { TypeMbti } from '../repository/enum/mbti.enum';
import { MbtiRepositoryService } from '../repository/service/mbti.repository.service';
import { PlaceRepositoryService } from '../repository/service/place.repository.service';
import { TagRepositoryService } from '../repository/service/tag.repository.service';
import { UserRepositoryService } from '../repository/service/user.repository.service';
import {
  UserResultDto,
  UserResultMbtiDto,
  UserResultPlaceDto,
} from './dto/user.service.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly placeRepositoryService: PlaceRepositoryService,
    private readonly tagRepositoryService: TagRepositoryService,
    private readonly mbtiRepositoryService: MbtiRepositoryService,
  ) {}

  async getTotalCount(): Promise<number> {
    return await this.userRepositoryService.getUserTotalCount();
  }

  async resultUser(mbit: TypeMbti): Promise<UserResultDto> {
    const mbti = await this.mbtiRepositoryService.getMbti(mbit);
    console.log('MBTI ::: ', mbti);
    const placeList = await this.placeRepositoryService.findPlaceByMbti(mbit);
    console.log('PLACE LIST ::: ', placeList);
    const randomValue = this.getRamdomValue(placeList.length);

    const place = placeList[randomValue];

    const tagList = await this.tagRepositoryService.findTagListByPlaceId(
      place.id,
    );

    const user = await this.userRepositoryService.upsertUser(
      plainToClass(UserEntity, {
        placeId: place.id,
      }),
    );

    const popularPlaceList =
      await this.placeRepositoryService.findHotPlaceList();

    const result = plainToClass(UserResultMbtiDto, {
      userId: user.id,
      name: mbti.name,
      place: UserResultPlaceDto.from(place, tagList),
    });

    const hotPlace = popularPlaceList.map((place) =>
      UserResultPlaceDto.from(place, tagList),
    );

    return plainToClass(UserResultDto, {
      result,
      hotPlace,
      isShare: user.shareUrl !== null,
    });
  }

  private getRamdomValue(maxNumber: number): number {
    const randomValue = Math.random();
    const scaledValue = randomValue * maxNumber;
    const intValue = Math.floor(scaledValue);

    return intValue;
  }
}
