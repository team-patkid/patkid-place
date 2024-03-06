import { Injectable } from '@nestjs/common';
import { UserRepositoryService } from '../repository/service/user.repository.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  async getTotalCount(): Promise<number> {
    return await this.userRepositoryService.getUserTotalCount();
  }
}
