import { Component, OnInit } from '@angular/core';
import { CategoryModule } from "../../../../../libs/category/src/lib/category/category.module";
import { ProductsModule } from "../../../../../libs/products/src/lib/products/products.module";
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [CategoryModule, ProductsModule, CarouselModule, GalleriaModule]
})
export class HomePageComponent implements OnInit{
  responsiveOptions: any[] | undefined;
  images: any[] | undefined;

  ngOnInit(): void {
      this.images =   ['https://st.depositphotos.com/1891797/3517/i/450/depositphotos_35173743-stock-photo-sale-on-wood-background.jpg','https://st.depositphotos.com/1891797/3517/i/450/depositphotos_35173743-stock-photo-sale-on-wood-background.jpg'];

  }

}

