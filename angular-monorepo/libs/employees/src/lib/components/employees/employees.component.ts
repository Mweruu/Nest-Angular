import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employees';
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit{
  employees:Employee[] = [];
  empId!:string;

  constructor(
    private employeesService: EmployeesService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeesService.getEmployees().subscribe(employees =>{
      this.employees = employees
    })
  }

  getEmployee(empId:string){
    this.router.navigate([`/employees/${empId}`]);
  }
}
