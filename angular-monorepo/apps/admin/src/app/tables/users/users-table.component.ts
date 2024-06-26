import { Employee, EmployeesService } from '@angular-monorepo/employees';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit{
  users!:Employee[]

  constructor(private employeesService:EmployeesService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.getUsers()
  }

  getUsers(){
    this.employeesService.getEmployees().subscribe(employees => {
      this.users = employees
    })
  }
  editUser(userId:string){
    this.router.navigate([`/users/form/${userId}`]);
  }
}
