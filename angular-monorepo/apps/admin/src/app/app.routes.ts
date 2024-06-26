import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsTableComponent } from './tables/products/products-table/products-table.component';
import { UsersTableComponent } from './tables/users/users-table.component';
import { CategoriesTableComponent } from './tables/categories/categories-table.component';
// import { ProductsComponent } from '@angular-monorepo/products';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsTableComponent,
      },
      {
        path: 'users',
        component: UsersTableComponent,
      },
      {
        path: 'category',
        component: CategoriesTableComponent,
      }
    ]
  },

];
