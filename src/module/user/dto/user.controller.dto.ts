import { ApiProperty } from '@nestjs/swagger';
import { PlaceEntity } from 'src/module/repository/entity/place.entity';
import { TagEntity } from 'src/module/repository/entity/tag.entity';
import { TypeTagType } from 'src/module/repository/enum/type.enum';

export class GetTotalCountResponse {
  @ApiProperty({ type: Number, description: '참여자 수', example: 100 })
  count: number;
}

export class UserResultResponse {
  result: UserResultMbtiResponse;
  hotPlace: Array<UserResultPlaceResponse>;
}

export class UserResultMbtiResponse {
  userId: string;
  name: string;
  place: UserResultPlaceResponse;
}

export class UserResultPlaceResponse {
  placeId: number;
  name: string;
  naverUrl: string;
  content: string;
  imageUrl: string;
  x: number;
  y: number;
  tags: Array<UserResultTagResponse>;

  static from(
    place: PlaceEntity,
    tagList: TagEntity[],
  ): UserResultPlaceResponse {
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

export class UserResultTagResponse {
  tagId: number;
  tag: string;
  type: TypeTagType;
}
