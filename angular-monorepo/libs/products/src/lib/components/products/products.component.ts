import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../models/products';

@Component({
  selector: 'lib-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products:Product[] = [];

  constructor(
    private productsService: ProductsService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts().subscribe(products =>{
      this.products = products
    })
  }

  getProduct(productId:string){
    this.router.navigate([`/products/${productId}`]);
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
