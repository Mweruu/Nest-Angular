import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
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
      console.log(response);
      expect(mockDatabaseService.employee.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updatedUser,
      });
      expect(response).toEqual(updatedUser);
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
      console.log(response, response);
      expect(response).toEqual(2);
      expect(mockDatabaseService.employee.findUnique).toHaveBeenCalledWith({
        where: { id: 2 },
      });
    });
  });
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
    });
  });
});
