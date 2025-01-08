import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthModule } from './auth.module';
import { signInDto } from './dto/signin.dto';
import { UpdateSignInDto } from './dto/update-signin.dto';
import { validate } from 'class-validator';

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

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [AuthController],
  //     providers: [
  //       AuthService,
  //       UserService,
  //       JwtService,
  //       {
  //         provide: getRepositoryToken(User),
  //         useValue: mockUserRepository,
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<AuthController>(AuthController);
  //   authService = module.get<AuthService>(AuthService);

  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule], // UserModule will automatically include necessary providers
    })
      .overrideProvider(getRepositoryToken(User))  // Override the default repository with the mock
      .useValue(mockUserRepository)  // Provide the mock repository
      .compile();

      
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
      const result = await controller.signIn(user as signInDto);
      expect(typeof user.email).toBe('string');
      expect(typeof user.password).toBe('string');
      expect(result).toEqual(access_token);
      expect(authService.signIn).toHaveBeenCalledWith(user.email, user.password);
      expect(authService.signIn).toHaveBeenCalled();
    });
  });

  describe('signInDto', () => {
    it('should pass validation for valid email and password', async () => {
      const validDto = new signInDto();
      validDto.email = 'jane@gmail.com';
      validDto.password = 'Mweru123';
  
      const errors = await validate(validDto);
  
      expect(errors.length).toBe(0); // Should pass with no validation errors
    });
  
    it('should fail validation for invalid email', async () => {
      const invalidEmailDto = new signInDto();
      invalidEmailDto.email = 'invalid-email'; // Invalid email format
      invalidEmailDto.password = 'Mweru123';
  
      const errors = await validate(invalidEmailDto);
  
      expect(errors.length).toBeGreaterThan(0); // Should fail validation
      expect(errors[0].constraints.isEmail).toBeDefined(); // Should have isEmail validation error
    });
  
    it('should fail validation for non-alphanumeric password', async () => {
      const invalidPasswordDto = new signInDto();
      invalidPasswordDto.email = 'jane@gmail.com';
      invalidPasswordDto.password = 'Mweru123!'; // Invalid password (contains a special character)
  
      const errors = await validate(invalidPasswordDto);
  
      expect(errors.length).toBeGreaterThan(0); // Should fail validation
      expect(errors[0].constraints.isAlphanumeric).toBeDefined(); // Should have isAlphanumeric validation error
    });
  
    it('should fail validation for missing email', async () => {
      const missingEmailDto = new signInDto();
      missingEmailDto.email = ''; // Empty email
      missingEmailDto.password = 'Mweru123';
  
      const errors = await validate(missingEmailDto);
  
      expect(errors.length).toBeGreaterThan(0); // Should fail validation
      expect(errors.some((error) => error.property === 'email')).toBeTruthy(); // Check if email validation error exists
    });
  
    it('should fail validation for missing password', async () => {
      const missingPasswordDto = new signInDto();
      missingPasswordDto.email = 'jane@gmail.com';
      missingPasswordDto.password = ''; // Empty password
  
      const errors = await validate(missingPasswordDto);
  
      expect(errors.length).toBeGreaterThan(0); // Should fail validation
      expect(errors.some((error) => error.property === 'password')).toBeTruthy(); // Check if password validation error exists
    });
  });

  describe('UpdateSignInDto', () => {
    it('should pass validation when all fields are valid', async () => {
      const validDto = new UpdateSignInDto();
      validDto.email = 'jane@gmail.com';
      validDto.password = 'Mweru123';
  
      const errors = await validate(validDto);
  
      expect(errors.length).toBe(0); // No validation errors should occur
    });
  
    it('should pass validation when only one field is provided', async () => {
      const partialDto = new UpdateSignInDto();
      partialDto.email = 'jane@gmail.com'; // Only email provided
  
      const errors = await validate(partialDto);
  
      expect(errors.length).toBe(0); // Validation should pass, since fields are optional
    });
  
    it('should pass validation when the password is provided without email', async () => {
      const partialDto = new UpdateSignInDto();
      partialDto.password = 'Mweru123';
  
      const errors = await validate(partialDto);
  
      expect(errors.length).toBe(0); // Validation should pass, since fields are optional
    });
  
    it('should fail validation for invalid email format', async () => {
      const invalidEmailDto = new UpdateSignInDto();
      invalidEmailDto.email = 'invalid-email'; // Invalid email format
  
      const errors = await validate(invalidEmailDto);
  
      expect(errors.length).toBeGreaterThan(0); // Validation should fail due to invalid email
      expect(errors[0].constraints.isEmail).toBeDefined(); // Check if isEmail validation error is present
    });
  
    it('should fail validation for non-alphanumeric password', async () => {
      const invalidPasswordDto = new UpdateSignInDto();
      invalidPasswordDto.password = 'Mweru123!'; // Invalid password with special character
  
      const errors = await validate(invalidPasswordDto);
  
      expect(errors.length).toBeGreaterThan(0); // Validation should fail due to invalid password
      expect(errors[0].constraints.isAlphanumeric).toBeDefined(); // Check if isAlphanumeric validation error is present
    });
  
    it('should pass validation when no fields are provided', async () => {
      const emptyDto = new UpdateSignInDto(); // No fields provided
  
      const errors = await validate(emptyDto);
  
      expect(errors.length).toBe(0); // No validation errors should occur because both fields are optional
    });
  });
});
