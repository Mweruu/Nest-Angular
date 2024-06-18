import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
// import { Logger } from '@nestjs/common';
// import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class EmployeesService {
  // private readonly logger = new Logger(EmployeesService.name);

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
    // this.logger.info('foo');
    // this.logger.debug('kdfjhdjmk');
    // this.logger.trace('hhnnnhdjmk');
    // this.logger.fatal(
    //   { id: `retrieve-all-pokemon-error` },
    //   `Retrieve all Pokemon`,
    // ); // object passed in first argument

    if (role)
      return this.databaseService.employee.findMany({ where: { role } });
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({ where: { id } });
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
