import { CategoryService } from '@angular-monorepo/category';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'libs/category/src/lib/models/category';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.css',
})
export class CategoriesTableComponent implements OnInit{
  categories!: Category[]
  constructor(private categoryService: CategoryService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe( category =>{
      this.categories = category
      console.log(category)
    })
  }
  editCategory(userId:string){
    this.router.navigate([`/category/form/${userId}`]);
  }
}
