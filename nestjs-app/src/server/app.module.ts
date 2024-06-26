import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './model/users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './model/employees/employees.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './model/products/products.module';
import { CategoryModule } from './model/category/category.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ProductsModule,
    CategoryModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 3 },
      { name: 'long', ttl: 60000, limit: 100 },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
