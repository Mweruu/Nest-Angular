import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../components/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ProductCategoryComponent } from '../components/product-category/product-category.component';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import { ProductsService } from '../services/products.service';

export const routes: Routes = [];


@NgModule({
  declarations: [ProductsComponent, ProductDetailsComponent, ProductCategoryComponent],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    RatingModule,
    DividerModule,
    InputNumberModule,
		// DataViewModule,
		// PickListModule,
		// OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
    DataViewModule,
    // CategoryModule,
  ],
  providers: [ProductsService, MessageService],
  exports: [ProductsComponent, ProductDetailsComponent, ProductCategoryComponent]
})
export class ProductsModule { }
