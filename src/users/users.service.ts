import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable() //attaches metadata that declares the class
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Ann',
      email: 'ann@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'jane',
      email: 'jane@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'john',
      email: 'john@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'chris',
      email: 'chris@gmail.com',
      role: 'ADMIN',
    },
  ];
  getUsers(): string {
    return 'Hello World usersss!';
  }

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User role not found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
