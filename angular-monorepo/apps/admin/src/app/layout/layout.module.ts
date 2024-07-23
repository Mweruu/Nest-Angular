import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { HttpClientModule } from '@angular/common/http';
import { CategoryModule } from 'libs/category/src/lib/category/category.module';
import { EmployeesModule } from 'libs/employees/src/lib/employees/employees.module';
import { ProductsModule } from 'libs/products/src/lib/products/products.module';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { ColorPickerModule } from 'primeng/colorpicker';

import { TopbarComponent } from '../topbar/topbar.component';
import { MenuComponent } from '../menu/menu.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProductsTableComponent } from '../tables/products/products-table/products-table.component';
import { EditProductComponent } from '../tables/products/product-form/edit-product.component';
import { UsersTableComponent } from '../tables/users/users-table.component';
import { UsersFormComponent } from '../tables/users/users-form/users-form.component';
import { CategoriesTableComponent } from '../tables/categories/categories-table.component';
import { CategoriesFormComponent } from '../tables/categories/categories-form/categories-form.component';
import { OrdersTableComponent } from '../tables/orders/orders-table.component';

@NgModule({
  declarations: [
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    MenuComponent,
    DashboardComponent,
    ProductsTableComponent,
    EditProductComponent,
    UsersTableComponent,
    UsersFormComponent,
    CategoriesTableComponent,
    CategoriesFormComponent,
    OrdersTableComponent,
  ],
  imports: [
    EmployeesModule,
    ProductsModule,
    CategoryModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RatingModule,
    RippleModule,
    RouterModule,
    MenuModule,
    ChartModule,
    TableModule,
    CardModule,
    ToastModule,
    ButtonModule,
    ToolbarModule,
    InputTextareaModule,
    SelectButtonModule,
    DropdownModule,
    ColorPickerModule,
],
exports: [LayoutComponent]
})
export class LayoutModule { }
