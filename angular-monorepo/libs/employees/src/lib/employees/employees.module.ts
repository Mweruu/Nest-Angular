import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from '../components/login/login.component';
import { EmployeesComponent } from '../components/employees/employees.component';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '../components/signup/signup.component';
import { Routes } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { EmployeeDetailsComponent } from '../components/employee-details/employee-details.component';

export const routes: Routes = [];


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
  ],
  declarations: [LoginComponent, EmployeesComponent, SignupComponent, EmployeeDetailsComponent],
  exports:[LoginComponent, EmployeesComponent, SignupComponent, EmployeeDetailsComponent]

})
export class EmployeesModule { }
