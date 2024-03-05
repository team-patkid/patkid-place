import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/exception/enum/error.enum';
import { ServiceError } from 'src/exception/service.error';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { TypeUserStatus } from '../enum/user.enum';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async upsertUser(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  async getUser(userId: string): Promise<UserEntity> {
    const result = this.userRepository.findOneBy({
      id: userId,
    });

    if (!result) throw new ServiceError(ErrorCode.NOT_FOUND_CONTENT);

    return result;
  }

  async getUserByShareUrl(shareUrl: string): Promise<UserEntity> {
    const result = this.userRepository.findOneBy({
      shareUrl,
    });

    if (!result) throw new ServiceError(ErrorCode.NOT_FOUND_CONTENT);

    return result;
  }

  async getUserTotalCount(): Promise<number> {
    const result = this.userRepository.count({
      where: {
        status: TypeUserStatus.NORMAL,
      },
    });

    return result;
  }
}
