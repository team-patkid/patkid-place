import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { ServiceExceptionFilter } from 'src/filter/service.exception.filter';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DatabaseService } from './database/database.service';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    QuestionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ServiceExceptionFilter,
    },
  ],
})
export class MainModule {}
