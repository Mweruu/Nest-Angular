import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  BASE_URL = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.BASE_URL}employees`)
  }

  signup(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.BASE_URL}employees`, employee)
  }

  getEmployee(id:string):Observable<Employee>{
    return this.http.get<Employee>(`${this.BASE_URL}employees/${id}`)
  }

  createUser(user:Employee):Observable<Employee>{
    console.log('got')
    return this.http.post<Employee>(`${this.BASE_URL}employees`, user)
  }

  updateUser( id:string, user:Employee):Observable<Employee>{
    return this.http.patch<Employee>(`${this.BASE_URL}employees/${id}`, user)
  }
}
