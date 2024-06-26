import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@angular-monorepo/products';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'lib-product-category',
    templateUrl: './product-category.component.html',
    styleUrl: './product-category.component.css',
})
export class ProductCategoryComponent implements OnInit {
  products:Product[] = [];
  currentId!:string;
  constructor(private productsService:ProductsService,
        private activatedRoute:ActivatedRoute,
        private router:Router
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.currentId = params['id']
        this.productsService.getProductCategory(this.currentId).subscribe(products =>{
          this.products = products;
        })
      }
    })
  }

  getProduct(productId:string){
    this.router.navigate([`/products/${productId}`]);
  }

  addProductToCart(){
    console.log(454)
 }

}
