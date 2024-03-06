import { ApiProperty } from '@nestjs/swagger';
import { TypeQuestionSubType } from 'src/module/repository/enum/question.sub.enum';

export class GetQeustionServiceDto {
  id: number;
  content: string;
  sort: number;
  questionSub: {
    id: number;
    questionId: number;
    type: TypeQuestionSubType;
    content: string;
  }[];

  static from(entity: Partial<GetQeustionServiceDto>) {
    const dto = new GetQeustionServiceDto();
    dto.id = entity.id;
    dto.content = entity.content;
    dto.sort = entity.sort;
    dto.questionSub = entity.questionSub.map((sub) => ({
      id: sub.id,
      questionId: sub.questionId,
      type: sub.type,
      content: sub.content,
    }));

    return dto;
  }
}

export class GetQuestionSubDto {
  id: number;
  questionId: number;
  type: TypeQuestionSubType;
  content: string;

  static from(entity: Partial<GetQuestionSubDto>) {
    const dto = new GetQuestionSubDto();
    dto.id = entity.id;
    dto.questionId = entity.questionId;
    dto.type = entity.type;
    dto.content = entity.content;

    return dto;
  }
}

export class GetQeustionDto {
  id: number;
  content: string;
  sort: number;
  @ApiProperty({ type: [GetQuestionSubDto] })
  questionSub: GetQuestionSubDto[];

  static from(entity: Partial<GetQeustionDto>) {
    const dto = new GetQeustionDto();
    dto.id = entity.id;
    dto.content = entity.content;
    dto.sort = entity.sort;
    dto.questionSub = entity.questionSub.map((sub) =>
      GetQuestionSubDto.from(sub),
    );

    return dto;
  }
}
