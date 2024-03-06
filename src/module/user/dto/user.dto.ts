import { ApiProperty } from '@nestjs/swagger';

export class GetTotalCountResponse {
  @ApiProperty({ type: Number, description: '참여자 수', example: 100 })
  count: number;
}
