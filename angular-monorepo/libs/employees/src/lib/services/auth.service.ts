import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employees';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = "http://localhost:3001/"

  constructor(private http: HttpClient) { }

  login(email:string, password:string):Observable<Employee>{
    return this.http.post<Employee>(`${this.BASE_URL}auth/login`, {email, password})
  }
}
