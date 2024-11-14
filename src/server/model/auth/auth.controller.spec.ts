import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

const mockUserRepository = {
  create: jest.fn(),
  createf: jest
    .fn(() => 'fn')
    .mockReturnValue('default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call'),
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
};
describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('', () => {
    it('should be defined', () => {
      expect(controller.signIn).toBeDefined();
    });

    it('should return token if authorised signin', async () => {
      const user = { email: 'test@example.com', password: 'hashedPassword' };
      const access_token = {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMywiZW1haWwiOiJqYW5ldHRAZ21haWwuY29tIiwiaWF0IjoxNzMxNTgyNzI5LCJleHAiOjE3MzE1ODI3ODl9.KlJ59PiGkSACmnpvFYD868v5aWahLxKC-UXeroRVS9I"
      }
      jest.spyOn(authService, 'signIn').mockResolvedValue(access_token);
      const result = await controller.signIn(user);
      expect(result).toEqual(access_token);
      expect(authService.signIn).toHaveBeenCalledWith(user.email, user.password);
      expect(authService.signIn).toHaveBeenCalled();
    });
  });
});
