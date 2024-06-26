import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { ProductsService } from '@angular-monorepo/products';

@Component({
  selector: 'lib-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent  implements OnInit{
  categories:Category[]=[];
  constructor(private categoryService: CategoryService,
    private productsService:ProductsService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.getCategories()
  }
  getCategories(){
    this.categoryService.getCategories().subscribe( categories=>{
      this.categories = categories;
    })
  }
  getCatProducts(catId:string){
    this.router.navigate([`/products/category/${catId}`])
  }
}
