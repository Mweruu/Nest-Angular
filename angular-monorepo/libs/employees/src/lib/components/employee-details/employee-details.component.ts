import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employees';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'lib-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;
  empId!:string;
  currentId!:string;

  constructor(private employeesService:EmployeesService,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees(){
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.currentId = params['id']
        this.employeesService.getEmployee(this.currentId).subscribe(employee =>{
          this.employee = employee;
        })
      }
    })
  }
}
