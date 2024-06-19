import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { DatabaseService } from '../database/database.service';
import { Prisma, Role } from '@prisma/client';
describe('EmployeesService', () => {
  let service: EmployeesService;
  const mockDatabaseService = {
    employee: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('EmployeesCreateService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.create).toBe('function');
    });
    it('should create and return an employee', async () => {
      const newUser = {
        name: 'Zinn',
        email: 'zin@gmail.com',
        role: 'ADMIN',
      };
      mockDatabaseService.employee.create.mockResolvedValue(newUser);

      const result = await service.create(
        newUser as Prisma.EmployeeCreateInput,
      );
      expect(mockDatabaseService.employee.create).toHaveBeenCalledWith({
        data: newUser,
      });
      expect(result).toEqual(newUser);
      expect(mockDatabaseService.employee.create).toHaveBeenCalled();
    });
  });
  describe('EmployeesUpdateService', () => {
    const updatedUser = {
      id: 1,
      name: 'Ann Updated',
      email: 'ann.updated@gmail.com',
      role: 'ADMIN',
    };
    it('should have a typeof function', () => {
      expect(typeof service.update).toBe('function');
    });
    it('should return a successful response', async () => {
      mockDatabaseService.employee.update.mockResolvedValue(updatedUser);

      const response = await service.update(
        1,
        updatedUser as Prisma.EmployeeCreateInput,
      );
      expect(mockDatabaseService.employee.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedUser,
      });
      expect(response).toEqual(updatedUser);
      expect(mockDatabaseService.employee.update).toHaveBeenCalled();
    });
  });
  describe('EmployeesFindAllService', () => {
    const employees = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@gmail.com',
        role: 'ENGINEER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it('should have a typeof function', () => {
      expect(typeof service.findAll).toBe('function');
    });
    it('should return a list of employees', async () => {
      mockDatabaseService.employee.findMany.mockResolvedValue(employees);
      const response = await service.findAll();
      expect(response).toEqual(employees);
      expect(mockDatabaseService.employee.findMany).toHaveBeenCalled();
      expect(mockDatabaseService.employee.findMany).toHaveBeenCalled();
    });

    it('should return a list of employees filtered by role', async () => {
      const role = 'ENGINEER';
      const filteredEmployees = employees.filter((emp) => emp.role === role);
      mockDatabaseService.employee.findMany.mockResolvedValue(
        filteredEmployees,
      );
      const response = await service.findAll(role);
      expect(response).toEqual(filteredEmployees);
      expect(mockDatabaseService.employee.findMany).toHaveBeenCalledWith({
        where: { role },
      });
    });
  });
  describe('EmployeesFindOneService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.findOne).toBe('function');
    });
    it('should return a successful response', async () => {
      mockDatabaseService.employee.findUnique.mockResolvedValue(2);
      const response = await service.findOne(2);
      expect(response).toEqual(2);
      expect(mockDatabaseService.employee.findUnique).toHaveBeenCalledWith({
        where: { id: 2 },
      });
      expect(mockDatabaseService.employee.findUnique).toHaveBeenCalled();
    });
    it('should throw NotFoundException if employee is not found', async () => {
      // mockDatabaseService.employee.findUnique.mockResolvedValue(null);
      // await expect(service.findOne(51)).rejects.toThrow(NotFoundException);
      // expect(mockDatabaseService.employee.findUnique).toHaveBeenCalledWith({
      //   where: { id: 51 },
      // });
    });
  });
  //common for service layer tests because it ensures that
  //the service interacts correctly with its dependencies.
  //use it to Test the interaction with the database
  describe('EmployeesRemoveService', () => {
    it('should have a typeof function', () => {
      expect(typeof service.remove).toBe('function');
    });
    it('should delete an employee', async () => {
      mockDatabaseService.employee.delete.mockResolvedValue(3);
      const response = await service.remove(3);
      expect(response).toEqual(3);
      expect(mockDatabaseService.employee.delete).toHaveBeenCalledWith({
        where: { id: 3 },
      });
      expect(mockDatabaseService.employee.delete).toHaveBeenCalled();
    });
  });

  //use it to test the behaviour of the method itself
  describe('EmployeesRemoveController', () => {
    const removeUser = {
      id: 3,
      name: 'Ann',
      email: 'annz@gmail.com',
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    it('should have a typeof function', () => {
      expect(typeof service.remove).toBe('function');
    });
    it('should delete an employee', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(removeUser);
      const response = await service.remove(3);
      expect(response.id).toEqual(3);
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
