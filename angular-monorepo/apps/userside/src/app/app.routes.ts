import { Route } from '@angular/router';
import { LoginComponent } from 'libs/employees/src/lib/components/login/login.component';
import { SignupComponent } from 'libs/employees/src/lib/components/signup/signup.component';
import { EmployeeDetailsComponent } from 'libs/employees/src/lib/components/employee-details/employee-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductsComponent } from '@angular-monorepo/products';
import { ProductDetailsComponent } from 'libs/products/src/lib/components/product-details/product-details.component';

export const appRoutes: Route[] = [
 {
  path: '',
  component: HomePageComponent,
  pathMatch:'full'
 },
 { path: 'login', component: LoginComponent },
 { path: 'signup', component: SignupComponent },
 { path: 'employees/:id', component: EmployeeDetailsComponent },
 { path: 'products/:id', component: ProductDetailsComponent },
 { path: 'products', component: ProductsComponent },

];
// export const appRoutes = routes
//  RouterModule.forRoot(routes);

