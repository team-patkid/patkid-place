import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ResponseDataDto } from 'src/decorator/dto/response-data.dto';
import { ResponseData } from 'src/decorator/response-data.decorator';
import { ResponseError } from 'src/decorator/response-error.decorator';
import { ErrorCode } from 'src/exception/enum/error.enum';
import {
  GetTotalCountResponse,
  UserResultResponse as GetUserResultResponse,
} from './dto/user.controller.dto';
import { GetUserResultRequest } from './dto/user.service.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('유저')
  @ApiOperation({ summary: '참여자 수 조회', description: '참여자 수 조회' })
  @ResponseData(GetTotalCountResponse)
  @Get('total-count')
  async getTotalVisitCount(): Promise<ResponseDataDto<GetTotalCountResponse>> {
    const reuslt = await this.userService.getTotalCount();

    return new ResponseDataDto(
      plainToClass(GetTotalCountResponse, { count: reuslt }),
    );
  }

  @ApiTags('유저')
  @ApiOperation({ summary: '테스트 결과', description: '테스트 결과' })
  @ResponseData(GetUserResultResponse)
  @HttpCode(HttpStatus.OK)
  @ResponseError([ErrorCode.NOT_FOUND_CONTENT])
  @Post('result')
  async postUserResult(
    @Body() body: GetUserResultRequest,
  ): Promise<ResponseDataDto<GetUserResultResponse>> {
    const result = await this.userService.resultUser(body.mbti);

    return new ResponseDataDto(
      plainToClass(GetUserResultResponse, {
        result: {
          userId: result.result.userId,
          name: result.result.name,
          place: {
            placeId: result.result.place.placeId,
            name: result.result.place.name,
            naverUrl: result.result.place.naverUrl,
            content: result.result.place.content,
            imageUrl: result.result.place.imageUrl,
            x: result.result.place.x,
            y: result.result.place.y,
            tags: result.result.place.tags.map((tag) => ({
              tagId: tag.tagId,
              tag: tag.tag,
              type: tag.type,
            })),
          },
        },
        hotPlace: result.hotPlace.map((place) => ({
          placeId: place.placeId,
          name: place.name,
          naverUrl: place.naverUrl,
          content: place.content,
          imageUrl: place.imageUrl,
          x: place.x,
          y: place.y,
          tags: place.tags.map((tag) => ({
            tagId: tag.tagId,
            tag: tag.tag,
            type: tag.type,
          })),
        })),
        isShare: result.isShare,
      }),
    );
  }
}
