import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../model/employees/employees.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private employeesService: EmployeesService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const employee = await this.employeesService.findOneEmail(email);
    if (employee?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: employee.id, email: employee.email };
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }

  async login(employee: any) {
    const payload = { email: employee.email, id: employee.id };
    return this.jwtService.sign(payload);
  }
}
