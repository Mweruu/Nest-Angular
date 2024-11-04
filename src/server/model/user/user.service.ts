import {
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

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto): Promise<{ message: string; id?: number }> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      this.logger.debug(newUser);
      const savedUser = await this.userRepository.save(newUser);
      return { message: `user created`,  id: savedUser.id  };
    } catch (error: any) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER'): Promise<User[]> {
    if (role) {
      this.logger.debug(role);
      const options: FindManyOptions<User> = {
        where: {
          role: role as Role,
        },
      };
      return this.userRepository.find(options);
    }
    return this.userRepository.find({ relations: ['orders'] });
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
    // return this.userRepository.findOneBy({ id });
    const user = await this.userRepository.findOne({ 
      where:{ email },
      relations: ['orders'], 
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

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
