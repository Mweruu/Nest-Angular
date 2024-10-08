import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  mockDatabaseService,
  newUser,
  createdUser,
  updateUserDto,
  userId,
  users,
  existingUser,
  updatedUser,
  mockUserRepository,
} from './../../../../test/mock/userMockData';


describe('UserController', () => {
  let controller: UserController;
  // let userRepository: typeof mockDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    // userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CreateUserController', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should create a user and return a success message', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(newUser);
      const result = await controller.create(newUser as CreateUserDto);
      expect(result).toEqual(newUser);
      expect(controller.create).toHaveBeenCalledWith(newUser);
      expect(controller.create).toHaveBeenCalled();
    });
  });

  describe('FindAllUserController', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    // it('should return all users', async () => {
    //   jest.spyOn(controller, 'findAll').mockResolvedValue(users);
    //   const result = await controller.findAll();
    //   expect(result).toEqual(result);
    //   expect(controller.findAll).toHaveBeenCalled();
    // });

    // it('should return a list of employees filtered by role', async () => {
    //   const role = 'INTERN';
    //   const filteredUsers = users.filter((emp) => emp.role === role);
    //   console.log(filteredUsers);
    //   jest.spyOn(controller, 'findAll').mockResolvedValue(filteredUsers);
    //   const response = await controller.findAll(role);
    //   expect(response).toEqual(filteredUsers);
    // });
  });

  describe('FindOneUserController', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should return the user with the given id', async () => {
      jest.spyOn(controller, 'findOne').mockResolvedValue(existingUser);
      const result = await controller.findOne(userId);
      expect(result).toEqual(existingUser);
      expect(controller.findOne).toHaveBeenCalledWith(userId);
      expect(controller.findOne).toHaveBeenCalled();
    });
  });

  describe('UpdateUserController', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should update the user with the given id', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(updatedUser);
      const result = await controller.update(userId, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(controller.update).toHaveBeenCalledWith(userId, updatedUser);
      expect(controller.update).toHaveBeenCalled();
    });
  });

  describe('RemoveUserController', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should delete a user', async () => {
      jest.spyOn(controller, 'remove').mockResolvedValue(undefined);
      console.log(userId)
      const response = await controller.remove(userId);
      // expect(response).toEqual(3);
      expect(response).toBeUndefined();
      expect(controller.remove).toHaveBeenCalled();
    });
  });
});
