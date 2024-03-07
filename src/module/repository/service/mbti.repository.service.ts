import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/exception/enum/error.enum';
import { ServiceError } from 'src/exception/service.error';
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

    if (!result) throw new ServiceError(ErrorCode.NOT_FOUND_CONTENT);

    return result;
  }
}
