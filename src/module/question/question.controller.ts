import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseException } from 'src/decorator/response-error.decorator';
import { ResponseListDto } from 'src/decorator/dto/response.list.dto';
import { ResponseList } from 'src/decorator/response-list.decorator';
import { GetQeustionDto } from './dto/question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiTags('질문')
  @ApiOperation({ 
    summary: '질문 목록 조회', 
    description: 'MBTI 성향 분석을 위한 질문 목록을 조회합니다.' 
  })
  @ResponseException(HttpStatus.NOT_FOUND, '질문 데이터를 찾을 수 없음')
  @ResponseException(HttpStatus.INTERNAL_SERVER_ERROR, '서버 내부 오류')
  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ResponseList(GetQeustionDto)
  async getList(): Promise<ResponseListDto<GetQeustionDto>> {
    const result = await this.questionService.getList();

    return new ResponseListDto<GetQeustionDto>(
      result.map((dto) =>
        GetQeustionDto.from({
          id: dto.id,
          content: dto.content,
          sort: dto.sort,
          type: dto.type,
          questionSub: dto.questionSub.map((sub) => ({
            id: sub.id,
            questionId: sub.questionId,
            type: sub.type,
            content: sub.content,
          })),
        }),
      ),
    );
  }
}
