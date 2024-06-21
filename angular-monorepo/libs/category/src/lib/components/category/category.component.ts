import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent  implements OnInit{
  categories:Category[]=[];
  constructor(private categoryService: CategoryService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.getCategories()
  }
  getCategories(){
    this.categoryService.getCategories().subscribe( categories=>{
      this.categories = categories;
      console.log(categories)
    })
  }
  getCatProducts(){
    this.router.navigate(['/products'])
  }
}
