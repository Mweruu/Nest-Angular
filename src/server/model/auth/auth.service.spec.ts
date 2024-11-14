import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<Record<keyof UserService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    userService = {
      findOneUser: jest.fn() as jest.Mock, // Ensure findOneUser is cast to a Jest mock function
    };
    jwtService = {
      signAsync: jest.fn(), // Mocking signAsync correctly
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign in', () => {
    it('should be defined', () => {
      expect(service.signIn).toBeDefined();
    });

    it('should return access_token if credentials are valid', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      (userService.findOneUser as jest.Mock).mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      (jwtService.signAsync as jest.Mock).mockResolvedValue('testToken');
  
      const result = await service.signIn('test@example.com', 'password');
  
      expect(bcrypt.compare).toHaveBeenCalledWith('password', user.password);
      expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: user.id, email: user.email });
      expect(result).toEqual({ access_token: 'testToken' });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      (userService.findOneUser as jest.Mock).mockResolvedValue(null);
  
      await expect(service.signIn('test@example.com', 'password')).rejects.toThrow(UnauthorizedException);
      expect(userService.findOneUser).toHaveBeenCalledWith('test@example.com');
    });
  
    it('should throw UnauthorizedException if password is incorrect', async () => {
      const user = { id: 1, email: 'test@example.com', password: 'hashedPassword' };
      (userService.findOneUser as jest.Mock).mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
  
      await expect(service.signIn('test@example.com', 'wrongPassword')).rejects.toThrow(UnauthorizedException);
      expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', user.password);
    });
  });
});
