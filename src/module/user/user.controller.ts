import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseException } from 'src/decorator/response-error.decorator';
import { plainToClass } from 'class-transformer';
import { ResponseDataDto } from 'src/decorator/dto/response-data.dto';
import { ResponseData } from 'src/decorator/response-data.decorator';
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
  @ResponseException(HttpStatus.INTERNAL_SERVER_ERROR, '서버 내부 오류')
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
  @ResponseException(HttpStatus.BAD_REQUEST, '잘못된 요청 데이터')
  @ResponseException(HttpStatus.UNPROCESSABLE_ENTITY, '유효하지 않은 MBTI 유형')
  @ResponseException(HttpStatus.NOT_FOUND, '해당 MBTI에 대한 추천 장소를 찾을 수 없음')
  @ResponseException(HttpStatus.INTERNAL_SERVER_ERROR, '서버 내부 오류')
  @HttpCode(HttpStatus.OK)
  @Post('result')
  async postUserResult(
    @Body() body: GetUserResultRequest,
  ): Promise<ResponseDataDto<GetUserResultResponse>> {
    const result = await this.userService.resultUser(body.mbti);

    return new ResponseDataDto(GetUserResultResponse.from(result));
  }
}
