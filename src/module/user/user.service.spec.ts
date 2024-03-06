import sinon, { SinonStubbedInstance } from 'sinon';
import { UserRepositoryService } from '../repository/service/user.repository.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepositoryService: SinonStubbedInstance<UserRepositoryService>;

  beforeEach(async () => {
    userRepositoryService = sinon.createStubInstance(UserRepositoryService);
    service = new UserService(userRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTotalCount', () => {
    it('should return the total count of users', async () => {
      // Arrange
      const totalCount = 10;
      userRepositoryService.getUserTotalCount.resolves(totalCount);

      // Act
      const result = await service.getTotalCount();

      // Assert
      expect(result).toBe(totalCount);
    });
  });
});
