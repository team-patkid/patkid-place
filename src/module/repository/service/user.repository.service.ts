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

  async getUserTotalCount(): Promise<number> {
    const result = this.userRepository.count({
      where: {
        status: TypeUserStatus.NORMAL,
      },
    });

    return result;
  }

  async getPopularPlaceIdList(): Promise<number[]> {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .select('user.placeId as "placeId"')
      .groupBy('user.placeId')
      .orderBy('COUNT(user.placeId)', 'DESC')
      .limit(3)
      .getRawMany();

    return result.map((item) => item.placeId);
  }
}
