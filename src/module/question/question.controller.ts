import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseListDto } from 'src/decorator/dto/response.list.dto';
import { ResponseError } from 'src/decorator/response-error.decorator';
import { ResponseList } from 'src/decorator/response-list.decorator';
import { ErrorCode } from 'src/exception/enum/error.enum';
import { GetQeustionDto } from './dto/question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiTags('질문')
  @ApiOperation({ summary: 'Get list question' })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ResponseList(GetQeustionDto)
  @ResponseError([ErrorCode.NOT_FOUND_CONTENT])
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
