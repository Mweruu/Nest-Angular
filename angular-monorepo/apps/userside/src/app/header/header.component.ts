import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { LocalstorageService } from 'libs/employees/src/lib/services/localstorage.service';
import { EmployeesService } from '@angular-monorepo/employees';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  username!:string;
  empId!:string;

  constructor(private localStorage:LocalstorageService,
    private employeesService:EmployeesService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.getCurrentEmployee()
  }

  getCurrentEmployee(){
    const token = this.localStorage.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenDecode)
      this.employeesService.getEmployee(tokenDecode.id).subscribe(employee =>{
        console.log(employee)
        if((employee.firstName || employee.email) && employee.id ){
          this.username = employee.firstName ? employee.firstName : employee.email!;
          this.empId = employee.id;
        }
      })
    }
  }

  getEmployee(empId:string){
    this.router.navigate([`/employees/${empId}`]);
  }

  logOut(){
    this.localStorage.removeToken();
    window.location.reload();
    // this.router.navigate(['']);
  }
}
