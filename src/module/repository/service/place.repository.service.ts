import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/exception/enum/error.enum';
import { ServiceError } from 'src/exception/service.error';
import { In, Repository } from 'typeorm';
import { MbtiEntity } from '../entity/mbti.entity';
import { PlaceEntity } from '../entity/place.entity';
import { TypeMbti } from '../enum/mbti.enum';
import { UserRepositoryService } from './user.repository.service';

@Injectable()
export class PlaceRepositoryService {
  constructor(
    @InjectRepository(PlaceEntity)
    private readonly placeRepository: Repository<PlaceEntity>,

    private readonly userRepositoryService: UserRepositoryService,
  ) {}

  async findPlaceByMbti(mbti: TypeMbti): Promise<PlaceEntity[]> {
    const result = await this.placeRepository
      .createQueryBuilder('place')
      .leftJoinAndSelect(MbtiEntity, 'mbti', 'mbti.id = place.mbtiId')
      .select()
      .where('mbti.mbti = :mbti', { mbti })
      .getMany();

    if (result.length < 1) throw new ServiceError(ErrorCode.NOT_FOUND_CONTENT);

    return result;
  }

  async findPlaceListById(placeId: number[]): Promise<PlaceEntity[]> {
    const result = await this.placeRepository.findBy({
      id: In(placeId),
    });

    return result;
  }

  async findHotPlaceList(): Promise<PlaceEntity[]> {
    const popularPlaceIdList =
      await this.userRepositoryService.getPopularPlaceIdList();

    const result = await this.findPlaceListById(popularPlaceIdList);

    return result;
  }
}
