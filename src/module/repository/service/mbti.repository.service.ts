import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceError } from 'src/exception/service.error';
import { ServiceErrorCode } from 'src/exception/enum/error.enum';
import { Repository } from 'typeorm';
import { MbtiEntity } from '../entity/mbti.entity';
import { TypeMbti } from '../enum/mbti.enum';

@Injectable()
export class MbtiRepositoryService {
  constructor(
    @InjectRepository(MbtiEntity)
    private readonly mbtiRepository: Repository<MbtiEntity>,
  ) {}

  async getMbti(mbti: TypeMbti): Promise<MbtiEntity> {
    const result = await this.mbtiRepository.findOne({
      where: {
        mbti,
      },
    });

    if (!result) throw new ServiceError('해당 MBTI 정보를 찾을 수 없습니다.', ServiceErrorCode.NOT_FOUND_DATA);

    return result;
  }
}
