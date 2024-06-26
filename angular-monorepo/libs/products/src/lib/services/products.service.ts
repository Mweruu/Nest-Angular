import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  BASE_URL = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}products`)
  }

  createProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.BASE_URL}products`, product)
  }

  updateProduct( id:string, product:Product):Observable<Product>{
    return this.http.patch<Product>(`${this.BASE_URL}products/${id}`, product)
  }

  getProduct(id:string):Observable<Product>{
    return this.http.get<Product>(`${this.BASE_URL}products/${id}`)
  }

  getProductCategory(catId:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}products/category/${catId}`)
  }
}
