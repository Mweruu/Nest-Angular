import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import {EmployeesModule} from '../../../../libs/employees/src/lib/employees/employees.module';
import {ProductsModule} from '../../../../libs/products/src/lib/products/products.module';
import {CategoryModule} from '../../../../libs/category/src/lib/category/category.module';
import { HomePageComponent } from './home-page/home-page.component';

@Component({
  standalone: true,
  imports: [
    HttpClientModule,
    NxWelcomeComponent,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    HomePageComponent,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    EmployeesModule,
    ProductsModule,
    CategoryModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'userside';
}
