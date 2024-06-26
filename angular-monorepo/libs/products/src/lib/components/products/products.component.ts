import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../models/products';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';

@Component({
  selector: 'lib-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products:Product[] = [];
  sortOptions: SelectItem[] = [];
  sortField = '';
  sortOrder = 0;

  constructor(
    private productsService: ProductsService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
    this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts().subscribe(products =>{
      this.products = products
      console.log(products)
      products.forEach(product => {
        if(product.category)
        console.log(product?.category.name);
      });    })
  }

  getProduct(productId:string){
    this.router.navigate([`/products/${productId}`]);
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
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
