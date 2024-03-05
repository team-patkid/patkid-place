import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MbtiEntity } from './entity/mbti.entity';
import { PlaceEntity } from './entity/place.entity';
import { QuestionEntity } from './entity/question.entity';
import { QuestionSubEntity } from './entity/question.sub.entity';
import { TagEntity } from './entity/tag.entity';
import { UserEntity } from './entity/user.entity';
import { UserRepositoryService } from './service/user.repository.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MbtiEntity,
      PlaceEntity,
      QuestionEntity,
      QuestionSubEntity,
      TagEntity,
      UserEntity,
    ]),
  ],
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class RepositoryModule {}
