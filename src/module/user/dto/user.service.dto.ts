import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum } from 'class-validator';
import { PlaceEntity } from 'src/module/repository/entity/place.entity';
import { TagEntity } from 'src/module/repository/entity/tag.entity';
import { TypeMbti } from 'src/module/repository/enum/mbti.enum';
import { TypeTagType } from 'src/module/repository/enum/type.enum';

export class UserResultDto {
  result: UserResultMbtiDto;
  hotPlace: Array<UserResultPlaceDto>;
}

export class UserResultMbtiDto {
  userId: string;
  name: string;
  place: UserResultPlaceDto;
}

export class UserResultPlaceDto {
  placeId: number;
  name: string;
  naverUrl: string;
  content: string;
  imageUrl: string;
  x: number;
  y: number;
  tags: Array<UserResultTagDto>;

  static from(place: PlaceEntity, tagList: TagEntity[]): UserResultPlaceDto {
    return {
      placeId: place.id,
      name: place.name,
      naverUrl: place.naverUrl,
      content: place.content,
      imageUrl: place.imageUrl,
      x: place.x,
      y: place.y,
      tags: tagList.map((tag) => ({
        tagId: tag.id,
        tag: tag.tag,
        type: tag.type,
      })),
    };
  }
}

export class UserResultTagDto {
  tagId: number;
  tag: string;
  type: TypeTagType;
}

export class GetUserResultRequest {
  @ApiProperty({ description: '성향 테스트 후 MBTI 결과', example: 'ISTJ' })
  @IsEnum(TypeMbti)
  @IsDefined()
  mbti: TypeMbti;
}
