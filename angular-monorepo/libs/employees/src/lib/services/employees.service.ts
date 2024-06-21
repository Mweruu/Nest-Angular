import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  BASE_URL = "http://localhost:3001/"

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
}
