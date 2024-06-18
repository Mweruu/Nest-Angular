import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { DatabaseService } from '../database/database.service';
import { Employee, Prisma, Role } from '@prisma/client';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let employeesService: EmployeesService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [EmployeesService, DatabaseService],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    employeesService = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('EmployeesCreateController', () => {
    const newUser: Employee = {
      id: 1,
      name: 'Ann',
      email: 'annz@gmail.com',
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    it('should have a typeof function', () => {
      expect(typeof controller.create).toBe('function');
    });
    it('should create and return an employee', async () => {
      jest.spyOn(employeesService, 'create').mockResolvedValue(newUser);
      const result = await controller.create(
        newUser as Prisma.EmployeeCreateInput,
      );
      expect(result).toEqual(newUser);
    });
  });
  describe('EmployeesUpdateController', () => {
    const updatedUser = {
      id: 1,
      name: 'Ann Updated',
      email: 'ann.updated@gmail.com',
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    it('should have a typeof function', () => {
      expect(typeof controller.update).toBe('function');
    });
    it('should update employee', async () => {
      jest.spyOn(employeesService, 'update').mockResolvedValue(updatedUser);
      const response = await controller.update(
        '1',
        updatedUser as Prisma.EmployeeCreateInput,
      );
      expect(response).toEqual(updatedUser);
    });
  });
  describe('EmployeesFindAllController', () => {
    const employees = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        role: Role.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@gmail.com',
        role: Role.ENGINEER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    it('should have a typeof function', () => {
      expect(typeof controller.findAll).toBe('function');
    });
    it('should return all employees', async () => {
      jest.spyOn(employeesService, 'findAll').mockResolvedValue(employees);
      const response = await controller.findAll();
      expect(response).toBe(employees);
    });

    it('should return a list of employees filtered by role', async () => {
      const role = 'ENGINEER';
      const filteredEmployees = employees.filter((emp) => emp.role === role);
      jest
        .spyOn(employeesService, 'findAll')
        .mockResolvedValue(filteredEmployees);
      const response = await controller.findAll(role);
      expect(response).toEqual(filteredEmployees);
    });
  });
  describe('EmployeesFindOneController', () => {
    const findUser: Employee = {
      id: 2,
      name: 'Ann',
      email: 'annz@gmail.com',
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    it('should have a typeof function', () => {
      expect(typeof controller.findOne).toBe('function');
    });
    it('should return a successful response', async () => {
      jest.spyOn(employeesService, 'findOne').mockResolvedValue(findUser);
      const response = await controller.findOne('2');
      console.log(response);
      expect(response.id).toBe(2);
    });
  });
  describe('EmployeesRemoveController', () => {
    const removeUser: Employee = {
      id: 3,
      name: 'Ann',
      email: 'annz@gmail.com',
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    it('should have a typeof function', () => {
      expect(typeof controller.remove).toBe('function');
    });
    it('should delete an employee', async () => {
      jest.spyOn(employeesService, 'remove').mockResolvedValue(removeUser);
      const response = await controller.remove('3');
      expect(response.id).toEqual(3);
    });
  });
});
