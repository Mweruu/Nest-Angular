import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Role, User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { AppDataSource } from '../../data-source';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ message: string; id?: number }> {
    try {
      const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
      if (existingUser) {
        throw new ConflictException('Email already in use');   
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
  
      this.logger.debug(newUser);
      const savedUser = await this.userRepository.save(newUser);
      this.logger.log('User Created', savedUser);
   
      return { message: `User Created`, id: savedUser.id };
    } catch (error: any) {
      if (error instanceof ConflictException) {
        throw error; 
      }
      this.logger.warn('Failed to create user', error.stack);

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER'): Promise<User[]> {
    let users;
    if (role) {
      this.logger.debug(role);
      const options: FindManyOptions<User> = {
        where: {
          role: role as Role,
        },
      };
      users = this.userRepository.find(options);
    }
    else{
      users = this.userRepository.find({ relations: ['orders'] });
    }
    return users
  }

  async findOne(id: number): Promise<User | null> {
    this.logger.debug('Doing something...');
    const user = await this.userRepository.findOne({       
       where: { id },
      relations: ['orders'], 
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneUser(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ 
      where:{ email },
      relations: ['orders'], 
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'password'],
     });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if email is unique
    if (updateUserDto.email) {
        const existingUser = await this.userRepository.findOneBy({ email: updateUserDto.email });
        if (existingUser && existingUser.id !== id) {
            throw new ConflictException(`Email ${updateUserDto.email} is already in use`);
        }
    }

    Object.assign(user, updateUserDto);

    // Hash password if it is updated
    if (updateUserDto.password) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    return await this.userRepository.save(user);
  }


  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
