import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { mockUserRepository } from '../../../../test/mock/userMockData';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let authService: AuthService;
  let mockUserService: Partial<UserService>;
  let mockJwtService: Partial<JwtService>;

  beforeEach(() => {
      mockUserService = {
          findOneUser: jest.fn(),
      };
      mockJwtService = {
          signAsync: jest.fn(),
      };
      authService = new AuthService(mockUserService as UserService, mockJwtService as JwtService);
  });

  it('should return an access token if email and password are correct', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = { id: 1, email, password };
      const token = 'mocked-access-token';

      mockUserService.findOneUser = jest.fn().mockResolvedValue(user);
      mockJwtService.signAsync = jest.fn().mockResolvedValue(token);

      const result = await authService.signIn(email, password);

      expect(mockUserService.findOneUser).toHaveBeenCalledWith(email);
      expect(mockUserService.findOneUser).toHaveBeenCalledTimes(1);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({ sub: user.id, email: user.email });
      expect(mockJwtService.signAsync).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ access_token: token });
  });

  it('should throw UnauthorizedException if password is incorrect', async () => {
      const email = 'test@example.com';
      const incorrectPassword = 'wrongPassword';
      const user = { id: 1, email, password: 'password123' };

      mockUserService.findOneUser = jest.fn().mockResolvedValue(user);

      await expect(authService.signIn(email, incorrectPassword)).rejects.toThrow(UnauthorizedException);
      expect(mockUserService.findOneUser).toHaveBeenCalledWith(email);
      expect(mockJwtService.signAsync).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if user is not found', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';

      mockUserService.findOneUser = jest.fn().mockResolvedValue(null);

      await expect(authService.signIn(email, password)).rejects.toThrow(UnauthorizedException);
      expect(mockUserService.findOneUser).toHaveBeenCalledWith(email);
      expect(mockJwtService.signAsync).not.toHaveBeenCalled();
  });

  // describe('sign in', () => {
  //   it('should be defined', () => {
  //     expect(service.signIn).toBeDefined();
  //   });

    // it('should be defined', () => {
    //   mockUserRepository.findOneUser.mockResolvedValue
    // });
  // });
});
