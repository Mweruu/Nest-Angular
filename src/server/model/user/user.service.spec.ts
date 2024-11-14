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
import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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
      expect(Object.values(Role)).toContain(createdUser.role);
      expect(Array.isArray(createdUser.orders)).toBe(true);
      expect(Array.isArray(createdUser.products)).toBe(true);
    });

    it('should create a user and return a message', async () => {
      const hashedPassword = 'hashedPassword';
      mockUserRepository.create.mockReturnValue(createdUser);
      mockUserRepository.save.mockResolvedValue(createdUser);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      const result = await service.create(newUser as unknown as CreateUserDto);
      expect(result).toEqual({ message: 'User Created', id: userId });
      expect(bcrypt.hash).toHaveBeenCalledWith(newUser.password, 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith({...newUser, password: expect.any(String)});
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

    it('should throw ConflictException if email is already in use', async () => {
      mockUserRepository.findOne.mockResolvedValue(existingUser); // Simulate existing user
  
      await expect(service.create(newUser as unknown as CreateUserDto)).rejects.toThrow(ConflictException);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: newUser.email } });
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

    // it('should Update a user', async () => {
    //   mockUserRepository.findOneBy.mockResolvedValue(existingUser);
    //   mockUserRepository.save.mockResolvedValue(updatedUser);
    //   const result = await service.update(userId, updateUserDto);
    //   expect(result).toEqual(updatedUser); // Ensure the returned user matches the updated user
    //   expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: userId }); // Check if findOneBy was called with correct userId
    //   expect(mockUserRepository.save).toHaveBeenCalledWith(updatedUser);
    // });

    it('should throw NotFoundException if the user does not exist', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
  
      await expect(
        service.update(1, { email: 'test@example.com' })
      ).rejects.toThrow(NotFoundException);
    });
  
    it('should throw ConflictException if the email is already in use', async () => {
      const existingUser = { id: 2, email: 'duplicate@example.com' };
      mockUserRepository.findOneBy.mockResolvedValueOnce({ id: 1, email: 'old@example.com' });
      mockUserRepository.findOneBy.mockResolvedValueOnce(existingUser);
  
      await expect(
        service.update(1, { email: 'duplicate@example.com' })
      ).rejects.toThrow(ConflictException);
    });
  
    it('should hash the password if it is updated', async () => {
      const saltRounds = 10;
      const user = { id: 1, password: 'oldPassword' };
      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockUserRepository.save.mockImplementation((userData) => Promise.resolve(userData));
  
      const updateUserDto = { password: 'newPassword' };
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

      const updatedUser = await service.update(1, updateUserDto);
  
      expect(bcrypt.hash).toHaveBeenCalledWith(updateUserDto.password, saltRounds);
      expect(updatedUser.password).toBe('hashedPassword');
    });
  
    it('should update the user with unique email and save the changes', async () => {
      const user = { id: 1, email: 'old@example.com' };
      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockUserRepository.save.mockResolvedValue({ ...user, email: 'new@example.com' });
  
      const updateUserDto = { email: 'new@example.com' };
      const updatedUser = await service.update(1, updateUserDto);
  
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email: 'new@example.com' });
      expect(updatedUser.email).toBe('new@example.com');
      expect(mockUserRepository.save).toHaveBeenCalledWith({ ...user, ...updateUserDto });
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
