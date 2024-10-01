import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {
  createdUser,
  mockUserRepository,
  newUser,
  updateUserDto,
  userId,
  users,
  existingUser,
  updatedUser,
} from './../../../../test/mock/userMockData';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  console.log(
    'createf',
    mockUserRepository.createf(),
    mockUserRepository.createf(),
    mockUserRepository.createf(),
    mockUserRepository.createf(),
  );

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UsersCreateService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.create).toBe('function');
    });
    it('should create a user and return a message', async () => {
      mockUserRepository.create.mockReturnValue(createdUser);
      mockUserRepository.save.mockResolvedValue(createdUser);
      const result = await service.create(newUser as unknown as CreateUserDto);
      expect(result).toEqual({ message: 'user created' });
      expect(mockUserRepository.create).toHaveBeenCalledWith(newUser);
      expect(mockUserRepository.create).toHaveBeenCalled();
      expect(mockUserRepository.save).toHaveBeenCalledWith(createdUser);
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockUserRepository.create.mockImplementation(() => {
        throw new Error('Some error occurred');
      });

      await expect(
        service.create(newUser as unknown as CreateUserDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('UsersFindAllService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.findAll).toBe('function');
    });

    it('should return a list of all available users', async () => {
      mockUserRepository.find.mockReturnValue(users);

      const response = await service.findAll();
      expect(response).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });

    it('should return a list of employees filtered by role', async () => {
      const role = 'INTERN';
      const filteredUsers = users.filter((emp) => emp.role === role);
      mockUserRepository.find.mockReturnValue(filteredUsers);
      const response = await service.findAll(role);
      expect(response).toEqual(filteredUsers);
    });
  });

  describe('UsersFindOneService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.findOne).toBe('function');
    });

    it('should Update a user', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(existingUser);
      const result = await service.findOne(userId);

      // Assertions
      expect(result).toEqual(existingUser);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    });
  });

  describe('UsersUpdateService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.update).toBe('function');
    });

    it('should Update a user', async () => {
      // Mock findOneBy method to return the existing user
      mockUserRepository.findOneBy.mockResolvedValue(existingUser);

      // Mock save method to return the updated user
      mockUserRepository.save.mockResolvedValue(updatedUser);

      // Call the service method to update the user
      const result = await service.update(userId, updateUserDto);

      // Assertions
      expect(result).toEqual(updatedUser); // Ensure the returned user matches the updated user

      // Verify mock method calls
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: userId }); // Check if findOneBy was called with correct userId
      expect(mockUserRepository.save).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe('UsersRemoveService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.remove).toBe('function');
    });

    it('should delete a user', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(existingUser);
      // mockUserRepository.delete.mockResolvedValue(existingUser);
      // mockUserRepository.delete.mockResolvedValue(1);
      const result = await service.findOne(userId);

      // Assertions
      expect(result).toEqual(existingUser);
      expect(mockUserRepository.findOneBy).toHaveBeenCalled();
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
      // expect(mockUserRepository.delete).toHaveBeenCalledWith({ id: userId });
      // expect(mockUserRepository.delete).toHaveBeenCalled();
    });
  });
});
