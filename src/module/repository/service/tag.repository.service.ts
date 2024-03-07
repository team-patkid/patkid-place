import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceEntity } from '../entity/place.entity';
import { TagEntity } from '../entity/tag.entity';

@Injectable()
export class TagRepositoryService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async findTagListByPlaceId(placeId: number): Promise<TagEntity[]> {
    const result = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect(PlaceEntity, 'place', 'place.id = tag.placeId')
      .select()
      .where('tag.place.id = :placeId', { placeId })
      .getMany();

    return result;
  }
}
