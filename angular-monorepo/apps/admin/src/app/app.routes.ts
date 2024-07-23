import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsTableComponent } from './tables/products/products-table/products-table.component';
import { UsersTableComponent } from './tables/users/users-table.component';
import { CategoriesTableComponent } from './tables/categories/categories-table.component';
import { EditProductComponent } from './tables/products/product-form/edit-product.component';
import { UsersFormComponent } from './tables/users/users-form/users-form.component';
import { CategoriesFormComponent } from './tables/categories/categories-form/categories-form.component';
import { OrdersTableComponent } from './tables/orders/orders-table.component';
import { LoginComponent } from 'libs/employees/src/lib/components/login/login.component';
import { SignupComponent } from 'libs/employees/src/lib/components/signup/signup.component';
import { AuthGuardService } from '@angular-monorepo/employees';
// import { ProductsComponent } from '@angular-monorepo/products';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    // canActivate:[AuthGuardService],
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
        path: 'products/form',
        component: EditProductComponent,
      },
      {
        path: 'products/form/:id',
        component: EditProductComponent,
      },
      {
        path: 'users',
        component: UsersTableComponent,
      },
      {
        path: 'users/form',
        component: UsersFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent,
      },
      {
        path: 'category',
        component: CategoriesTableComponent,
      },
      {
        path: 'category/form',
        component: CategoriesFormComponent
      },
      {
        path: 'category/form/:id',
        component: CategoriesFormComponent
      },
      {
        path: 'orders',
        component: OrdersTableComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo:'',
    pathMatch:'full'
  }

];
