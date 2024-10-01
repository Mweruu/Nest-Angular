import {
  Injectable,
  InternalServerErrorException,
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
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser);
      return { message: `user created` };
    } catch (error: any) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER'): Promise<User[]> {
    if (role) {
      console.log(role);
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
    // return this.userRepository.findOneBy({ id });
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneUser(email: string): Promise<User | null> {
    // return this.userRepository.findOneBy({ id });
    const user = await this.userRepository.findOneBy({ email });
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
    const userToRemove = await this.userRepository.findOneBy({ id });
    if (!userToRemove) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(userToRemove);
  }
}
