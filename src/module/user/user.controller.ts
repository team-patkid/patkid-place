import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ResponseDataDto } from 'src/decorator/dto/response-data.dto';
import { ResponseData } from 'src/decorator/response-data.decorator';
import { GetTotalCountResponse } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('참여 카운트')
  @ApiOperation({ summary: '참여자 수 조회', description: '참여자 수 조회' })
  @ResponseData(GetTotalCountResponse)
  @Get('total-count')
  async getTotalVisitCount(): Promise<ResponseDataDto<GetTotalCountResponse>> {
    const reuslt = await this.userService.getTotalCount();

    return new ResponseDataDto(
      plainToClass(GetTotalCountResponse, { count: reuslt }),
    );
  }
}
