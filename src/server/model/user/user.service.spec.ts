import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
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
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UsersCreateService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.create).toBe('function');
      expect(typeof createdUser.id).toBe('number');
      expect(typeof createdUser.email).toBe('string');
      expect(typeof createdUser.firstName).toBe('string');
      expect(typeof createdUser.lastName).toBe('string');
      expect(typeof createdUser.password).toBe('string');
      expect(Object.values(Role)).toContain(createdUser.role);
      expect(Array.isArray(createdUser.orders)).toBe(true);
      expect(Array.isArray(createdUser.products)).toBe(true);
    });

    it('should create a user and return a message', async () => {
      mockUserRepository.create.mockReturnValue(createdUser);
      mockUserRepository.save.mockResolvedValue(createdUser);
      const result = await service.create(newUser as unknown as CreateUserDto);
      expect(result).toEqual({ message: 'user created', id: userId });
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

  describe('UsersFindOneService by id', () => {
    it('should have a typeof function', () => {
      expect(typeof service.findOne).toBe('function');
    });

    it('should find one user', async () => {
      mockUserRepository.findOne.mockResolvedValue(existingUser);
      const result = await service.findOne(userId);

      // Assertions
      expect(result).toEqual(existingUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ 
        where: { id: 1 },
        relations: ['orders']
      });
    });

    it('should throw an error if user id is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findOne(userId)).rejects.toThrow(NotFoundException);
    });
  });


  describe('UsersFindOneService by email', () => {
    it('should have a typeof function', () => {
      expect(typeof service.findOneUser).toBe('function');
    });

    it('should find one user', async () => {
      mockUserRepository.findOne.mockResolvedValue(existingUser);
      const result = await service.findOneUser(newUser.email);

      // Assertions
      expect(result).toEqual(existingUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ 
        where: { email: newUser.email },
        relations: ['orders']
      });
    });

    it('should throw an error if user id is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findOneUser(newUser.email)).rejects.toThrow(NotFoundException);
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

      // // Assertions
      expect(result).toEqual(updatedUser); // Ensure the returned user matches the updated user

      // Verify mock method calls
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: userId }); // Check if findOneBy was called with correct userId
      expect(mockUserRepository.save).toHaveBeenCalledWith(updatedUser);
    });

    it('should throw an error if user id is not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(undefined);
      await expect(service.update(userId, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('UsersRemoveService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.remove).toBe('function');
    });

    it('should delete an entity successfully when it exists', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });
      await service.remove(userId); 
      expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should throw a NotFoundException when the entity does not exist', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 0 });
      // await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      await expect(service.remove(1)).rejects.toBeInstanceOf(NotFoundException);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
