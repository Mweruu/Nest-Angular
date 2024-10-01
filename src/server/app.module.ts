import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './model/user/user.module';
import { AuthModule } from './model/auth/auth.module';
import { OrderModule } from './model/order/order.module';
import { CategoryModule } from './model/category/category.module';
import { ProductsModule } from './model/products/products.module';
import { OrderProductModule } from './model/order-product/order-product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './model/category/entities/category.entity';
import { OrderProduct } from './model/order-product/entities/order-product.entity';
import { Order } from './model/order/entities/order.entity';
import { Product } from './model/products/entities/product.entity';
import { User } from './model/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'myPassword',
      database: 'mytypeorm',
      entities: [User, Order, OrderProduct, Product, Category],
      synchronize: true,
    }),
    // TypeOrmModule.forRootAsync({}),
    UserModule,
    AuthModule,
    OrderModule,
    CategoryModule,
    ProductsModule,
    OrderProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
