import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../../../libs/products/src';
import { ProductsService } from 'libs/products/src/lib/services/products.service';

interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
})
export class ProductsTableComponent implements OnInit {
  expandedRows: expandedRows = {};
  isExpanded = false;
  products:Product[] = []

  constructor(private productsService:ProductsService) { }

  ngOnInit() {
    console.log("dfjhdf")
    this.getProducts()
  }

  getProducts(){
    console.log("getProducts")
    this.productsService.getProducts().subscribe(products => this.products = products);
  }

  expandAll() {
    console.log(this.products)
      if (!this.isExpanded) {
          this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

      } else {
          this.expandedRows = {};
      }
      this.isExpanded = !this.isExpanded;
  }
}
