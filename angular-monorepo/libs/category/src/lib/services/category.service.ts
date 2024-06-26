import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  BASE_URL = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.BASE_URL}category`)
  }

  createCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(`${this.BASE_URL}category`, category)
  }

  getCategory(id:string):Observable<Category>{
    return this.http.get<Category>(`${this.BASE_URL}category/${id}`)
  }

  updateCategories(id:string, category:Category):Observable<Category>{
    return this.http.patch<Category>(`${this.BASE_URL}category/${id}`, category)
  }
}
