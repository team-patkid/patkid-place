import { ApiProperty } from '@nestjs/swagger';
import { TypeQuestiontype } from 'src/module/repository/enum/question.enum';
import { TypeQuestionSubType } from 'src/module/repository/enum/question.sub.enum';

export class GetQeustionServiceDto {
  id: number;
  content: string;
  sort: number;
  type: TypeQuestiontype;
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
    dto.type = entity.type;
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
  @ApiProperty({ type: Number, description: '메인 질문 ID', example: 1 })
  questionId: number;
  @ApiProperty({ type: String, description: 'MBTI 성향 타입', example: 'I' })
  type: TypeQuestionSubType;
  @ApiProperty({
    type: String,
    description: '부가 질문',
    example: ' 전시회 티켓을 사도록 친구를 설득한다',
  })
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
  @ApiProperty({
    type: String,
    description: 'content',
    example: '이벤트에 당첨돼서 전시회 티켓 한 장이 생긴 나는',
  })
  content: string;
  @ApiProperty({
    type: String,
    description: '질문 타입',
    example: 'EI',
  })
  type: TypeQuestiontype;
  @ApiProperty({ type: Number, description: '질문 순서', example: 1 })
  sort: number;
  @ApiProperty({ type: [GetQuestionSubDto] })
  questionSub: GetQuestionSubDto[];

  static from(entity: Partial<GetQeustionDto>) {
    const dto = new GetQeustionDto();
    dto.id = entity.id;
    dto.content = entity.content;
    dto.sort = entity.sort;
    dto.type = entity.type;
    dto.questionSub = entity.questionSub.map((sub) =>
      GetQuestionSubDto.from(sub),
    );

    return dto;
  }
}
