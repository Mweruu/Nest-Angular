import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  newUser,
  updateUserDto,
  userId,
  users,
  existingUser,
  updatedUser,
  mockUserRepository,
} from './../../../../test/mock/userMockData';
// import { UserModule } from './user.module';
// import { DataSource } from 'typeorm';

// const mockDataSource = {};

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [UserModule, TypeOrmModule.forFeature([User]), ],
      controllers: [UserController],
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        // { provide: DataSource, useValue: mockDataSource }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CreateUserController', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should create a user and return a success message', async () => {
      jest.spyOn(userService, 'create').mockResolvedValue(newUser);
      const result = await controller.create(newUser as CreateUserDto);
      expect(result).toEqual(newUser);
      expect(userService.create).toHaveBeenCalledWith(newUser);
      expect(userService.create).toHaveBeenCalled();
    });
  });

  describe('FindAllUserController', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should return all users', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValue(users);
      const result = await controller.findAll();
      expect(result).toEqual(result);
      expect(userService.findAll).toHaveBeenCalled();
    });

    it('should return a list of employees filtered by role', async () => {
      const role = 'INTERN';
      const filteredUsers = users.filter((emp) => emp.role === role);
      jest.spyOn(userService, 'findAll').mockResolvedValue(filteredUsers);
      const response = await controller.findAll(role);
      expect(response).toEqual(filteredUsers);
    });
  });

  describe('FindOneUserController', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should return the user with the given id', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(existingUser);
      const result = await controller.findOne(userId);
      expect(result).toEqual(existingUser);
      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(userService.findOne).toHaveBeenCalled();
    });
  });

  describe('UpdateUserController', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should update the user with the given id', async () => {
      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);
      const result = await controller.update(userId, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(userService.update).toHaveBeenCalledWith(userId, updatedUser);
      expect(userService.update).toHaveBeenCalled();
    });
  });

  describe('RemoveUserController', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should delete a user', async () => {
      jest.spyOn(userService, 'remove').mockResolvedValue(undefined);
      const response = await controller.remove(userId);
      // expect(response).toEqual(3);
      expect(response).toBeUndefined();
      expect(userService.remove).toHaveBeenCalled();
    });
  });
});
