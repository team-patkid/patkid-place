import { ApiProperty } from '@nestjs/swagger';
import { PlaceEntity } from 'src/module/repository/entity/place.entity';
import { TagEntity } from 'src/module/repository/entity/tag.entity';
import { TypeTagType } from 'src/module/repository/enum/type.enum';

export class GetTotalCountResponse {
  @ApiProperty({ type: Number, description: '참여자 수', example: 100 })
  count: number;
}

export class UserResultTagResponse {
  @ApiProperty({ type: Number, description: '태그 ID', example: 1 })
  tagId: number;
  
  @ApiProperty({ type: String, description: '태그명', example: '조용한' })
  tag: string;
  
  @ApiProperty({ enum: TypeTagType, description: '태그 타입' })
  type: TypeTagType;
}

export class UserResultPlaceResponse {
  @ApiProperty({ type: Number, description: '장소 ID', example: 1 })
  placeId: number;
  
  @ApiProperty({ type: String, description: '장소명', example: '카페 이름' })
  name: string;
  
  @ApiProperty({ type: String, description: '네이버 URL', example: 'https://naver.com' })
  naverUrl: string;
  
  @ApiProperty({ type: String, description: '장소 설명', example: '조용한 카페입니다' })
  content: string;
  
  @ApiProperty({ type: String, description: '이미지 URL', example: 'https://image.com' })
  imageUrl: string;
  
  @ApiProperty({ type: Number, description: '경도', example: 127.123456 })
  x: number;
  
  @ApiProperty({ type: Number, description: '위도', example: 37.123456 })
  y: number;
  
  @ApiProperty({ type: [UserResultTagResponse], description: '태그 목록' })
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

export class UserResultMbtiResponse {
  @ApiProperty({ type: String, description: '사용자 ID', example: 'uuid-string' })
  userId: string;
  
  @ApiProperty({ type: String, description: 'MBTI 이름', example: 'INTJ' })
  name: string;
  
  @ApiProperty({ type: UserResultPlaceResponse, description: '추천 장소' })
  place: UserResultPlaceResponse;
}

export class UserResultResponse {
  @ApiProperty({ type: UserResultMbtiResponse, description: '테스트 결과' })
  result: UserResultMbtiResponse;
  
  @ApiProperty({ type: [UserResultPlaceResponse], description: '인기 장소 목록' })
  hotPlace: Array<UserResultPlaceResponse>;
}