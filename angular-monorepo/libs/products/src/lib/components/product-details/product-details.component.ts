import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products';
import { ProductsService } from '@angular-monorepo/products';

@Component({
  selector: 'lib-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  productId!:string;
  currentId!:string;
  quantity = 1;

  constructor(private productService:ProductsService,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.currentId = params['id']
        this.productService.getProduct(this.currentId).subscribe(product =>{
          this.product = product;
        })
      }
    })
  }

  addProductToCart(){
    console.log(454)
    // const cartItem : CartItem = {
  //      productId:this.product.id,
  //      quantity:this.quantity
  //    }
  //    this.cartService.setCartItem(cartItem)
  //    if(cartItem){
  //      this.messageService.add({
  //        severity:'success',
  //        summary:`${cartItem.quantity} Item added to cart`,
  //      })
  //    }else{
  //      this.messageService.add({
  //      severity:'error',
  //      summary:'Item not added to cart',
  //    })
  //  }

 }

}
