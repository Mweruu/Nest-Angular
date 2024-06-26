import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { TopbarComponent } from '../topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { HttpClientModule } from '@angular/common/http';
import { ProductsTableComponent } from '../tables/products/products-table/products-table.component';
import { CategoryModule } from 'libs/category/src/lib/category/category.module';
import { EmployeesModule } from 'libs/employees/src/lib/employees/employees.module';
import { ProductsModule } from 'libs/products/src/lib/products/products.module';

@NgModule({
  declarations: [
    TopbarComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    MenuComponent,
    DashboardComponent,
    ProductsTableComponent,
  ],
  imports: [
    EmployeesModule,
    ProductsModule,
    CategoryModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
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
],
exports: [LayoutComponent]
})
export class LayoutModule { }
