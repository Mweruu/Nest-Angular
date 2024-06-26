import { Test, TestingModule } from '@nestjs/testing';
import { Employee, Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/server/database/database.service';
import { EmployeesController } from 'src/server/model/employees/employees.controller';
import { EmployeesService } from 'src/server/model/employees/employees.service';
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
      firstName: 'Ann',
      lastName: 'Ann',
      email: 'annz@gmail.com',
      password: 'Mweru123',
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
      expect(employeesService.create).toHaveBeenCalled();
    });
  });
  describe('EmployeesUpdateController', () => {
    const updatedUser = {
      id: 1,
      firstName: 'Ann',
      lastName: 'Updated',
      email: 'ann.updated@gmail.com',
      password: 'Mweru123',
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
      expect(employeesService.update).toHaveBeenCalled();
    });
  });
  describe('EmployeesFindAllController', () => {
    const employees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        password: 'Mweru123',
        role: Role.ADMIN,
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@gmail.com',
        password: 'Mweru123',
        role: Role.ENGINEER,
        orders: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: 'Ann',
        lastName: 'Ann',
        email: 'ann@gmail.com',
        password: 'Mweru123',
        role: Role.INTERN,
        orders: [],
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
      console.log(response);
      expect(response).toBe(employees);
      expect(employeesService.findAll).toHaveBeenCalled();
    });

    it('should return a list of employees filtered by role', async () => {
      const role = 'INTERN';
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
      firstName: 'Ann',
      lastName: 'Ann',
      email: 'annz@gmail.com',
      password: 'Mweru123',
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
      expect(response.id).toBe(2);
      expect(employeesService.findOne).toHaveBeenCalled();
    });
  });
  describe('EmployeesRemoveController', () => {
    const removeUser: Employee = {
      id: 3,
      firstName: 'Ann',
      lastName: 'Ann',
      email: 'annz@gmail.com',
      password: 'Mweru123',
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
      expect(employeesService.remove).toHaveBeenCalled();
    });
  });
});
