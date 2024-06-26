import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { DatabaseService } from 'src/server/database/database.service';
// import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class EmployeesService {
  private readonly logger = new Logger(EmployeesService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    // @InjectPinoLogger(EmployeesService.name)
    // private readonly logger: PinoLogger,
  ) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    // this.logger.warn({ foo: 'bar' }, 'baz %s', 'qux');
    // this.logger.error('foo %s %o', 'bar', { baz: 'qux' });
    // this.logger.log('foo');
    // this.logger.debug('kdfjhdjmk');
    // this.logger.verbose('hhnnnhdjmk');
    // this.logger.fatal(
    //   { id: `retrieve-all-pokemon-error` },
    //   `Retrieve all Pokemon`,
    // );
    if (role) {
      return this.databaseService.employee.findMany({ where: { role } });
    }
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const employee = this.databaseService.employee.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  async findOneEmail(email: string): Promise<Employee> {
    const employee = this.databaseService.employee.findUnique({
      where: { email },
    });
    return employee;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({ where: { id } });
  }
}
