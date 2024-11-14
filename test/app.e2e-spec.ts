import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/server/app.module';
import { createdUser } from './mock/userMockData';
import { createdProduct } from './mock/productMockData';
import { createdOrderProduct } from './mock/orderProductMockData';
import { createdOrder } from './mock/orderMockData';
import { createdCategory } from './mock/CategoryMockData';

const Url = `http://localhost:3000`;

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Nest js app running!');
  });
});

describe('UserController (e2e)', () => {
  let userId: number;

  it('/ (POST)', async () => {
    await request(Url)
      .post('/user')
      .send(createdUser)
      .expect(201)
      .expect((response) => {
        userId = response.body.id
        expect(response.body).toEqual({ message: 'User Created', id: response.body.id });
      });
  });

  it('/ (GET)', async () => {
    await request(Url)
      .get('/user')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);           
        expect(response.body.length).toBeGreaterThan(0);            
        response.body.forEach((user) => {
          expect(user).toHaveProperty('id');                        
          expect(user).toHaveProperty('email');                    
          expect(user).toHaveProperty('role');                    
          expect(user).toHaveProperty('firstName');                    
          expect(user).toHaveProperty('lastName');                     
          expect(user).not.toHaveProperty('password'); 
        });
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/user/${userId}`)
      .expect(200)
      .expect((response) => {
         expect(response.body).toHaveProperty('id', userId);       
         expect(response.body).toHaveProperty('firstName');                
         expect(response.body).toHaveProperty('lastName');                
         expect(response.body).toHaveProperty('role');                
         expect(response.body).toHaveProperty('email');               
         expect(response.body).not.toHaveProperty('password'); 
      });
  });

  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/user/${userId}`)
      .send({lastName: "Smith"})
      .expect(200)
      .expect((response) => {
         expect(response.body).toHaveProperty('id', userId);       
         expect(response.body).toHaveProperty('firstName');                
         expect(response.body).toHaveProperty('lastName');                
         expect(response.body).toHaveProperty('role');    
         expect(response.body).toHaveProperty('email');               
         expect(response.body).not.toHaveProperty('password'); 
      });
  });

  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/user/${userId}`)
      .send({lastName: 678})
      .expect(400)
      .expect((response) => {
        expect(response.body.message).toEqual([ 'lastName must be a string' ]);
        expect(response.body.error).toEqual('Bad Request');       
        expect(response.body.statusCode).toEqual(400);              
      });
  });

  it('/ (DELETE:id)', async () => {
    await request(Url)
      .delete(`/user/${userId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({});
      });
  });
});

describe('ProductController (e2e)', () => {
  let productId: number;

  it('/ (POST)', async () => {
    await request(Url)
      .post('/products')
      .send(createdProduct)
      .expect(201)
      .expect((response) => {
        productId = response.body.id
        expect(response.body).toEqual({message: 'Product Created', id:response.body.id});
      });
  });

  it('/ (GET)', async () => {
    await request(Url)
      .get('/products')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);          
        expect(response.body.length).toBeGreaterThan(0);           
        response.body.forEach((user) => {
          expect(user).toHaveProperty('id');
          expect(user).toHaveProperty('inventoryStatus');
          expect(user).toHaveProperty('name');
          expect(user).toHaveProperty('price');
          expect(user).toHaveProperty('code');
          expect(user).toHaveProperty('quantity');
          expect(user).toHaveProperty('description');  
        });
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/products/${productId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', productId);
        expect(response.body).toHaveProperty('inventoryStatus');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('price');
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('quantity');
        expect(response.body).toHaveProperty('description');
      });
  });

  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/products/${productId}`)
      .send({price : "78"})
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', productId);
        expect(response.body).toHaveProperty('inventoryStatus');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('price');
        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('quantity');
        expect(response.body).toHaveProperty('description');
      });
  });

  it('/ (DELETE:id)', async () => {
    await request(Url)
      .delete(`/products/${productId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({});
      });
  });
});

describe('OrderProductController (e2e)', () => {
  let opId: number;

  it('/ (POST)', async () => {
    await request(Url)
      .post('/order-product')
      .send(createdOrderProduct)
      .expect(201)
      .expect((response) => {
        opId = response.body.id
        expect(response.body).toEqual({message: 'Order Product Created', id:response.body.id});
      });
  });

  it('/ (GET)', async () => {
    await request(Url)
      .get('/order-product')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);            
        expect(response.body.length).toBeGreaterThan(0); 
        response.body.forEach((op) => {
          expect(op).toHaveProperty('id');
          expect(op).toHaveProperty('amount');
          expect(op).toHaveProperty('quantity');
          expect(op).toHaveProperty('order');  
          expect(op).toHaveProperty('products');  
        });
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/order-product/${opId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', opId);
        expect(response.body).toHaveProperty('quantity');
        expect(response.body).toHaveProperty('amount');
        expect(response.body.order).toHaveProperty('status');            
        expect(response.body.order).toHaveProperty('quantity');            
        expect(response.body.order).toHaveProperty('amount');            
        expect(response.body.products).toHaveProperty('inventoryStatus');
        expect(response.body.products).toHaveProperty('name');
        expect(response.body.products).toHaveProperty('price');
        expect(response.body.products).toHaveProperty('code');
        expect(response.body.products).toHaveProperty('quantity');
        expect(response.body.products).toHaveProperty('description');           
      });
  });

  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/order-product/${opId}`)
      .send({quantity: 68,})
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', opId);
        expect(response.body).toHaveProperty('amount');
        expect(response.body).toHaveProperty('quantity');
      });
  });

  it('/ (DELETE:id)', async () => {
    await request(Url)
      .delete(`/order-product/${opId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({});
      });
  });
});

describe('OrderController (e2e)', () => {
  let orderId: number;

  it('/ (POST)', async () => {
    await request(Url)
      .post('/order')
      .send(createdOrder)
      .expect(201)
      .expect((response) => {
        orderId = response.body.id
        expect(response.body).toEqual({message: 'Order Created', id:response.body.id});
      });
  });

  it('/ (GET)', async () => {
    await request(Url)
      .get('/order')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);            
        expect(response.body.length).toBeGreaterThan(0); 
        response.body.forEach((order) => {
          expect(order).toHaveProperty('id');
          expect(order).toHaveProperty('status');
          expect(order).toHaveProperty('quantity');
          expect(order).toHaveProperty('amount');  
          expect(order).toHaveProperty('customer');  
          expect(order).toHaveProperty('products'); 
        });
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/order/${orderId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', orderId);
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('quantity');
        expect(response.body).toHaveProperty('amount');  
        expect(response.body).toHaveProperty('customer');  
        expect(response.body).toHaveProperty('products');  
      });
  });

  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/order/${orderId}`)
      .send()
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', orderId);
        expect(response.body).toHaveProperty('status');
        expect(response.body).toHaveProperty('quantity');
        expect(response.body).toHaveProperty('amount');  
      });
  });

  it('/ (DELETE:id)', async () => {
    await request(Url)
      .delete(`/order/${orderId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({})
      });
  });
});

describe('CategoryController (e2e)', () => {
  let categoryId: number;

  it('/ (POST)', async () => {
    await request(Url)
      .post('/category')
      .send(createdCategory)
      .expect(201)
      .expect((response) => {
        categoryId = response.body.id;
        expect(response.body).toEqual({message: 'New Category Created', id:response.body.id});
      });
  });

  it('/ (GET)', async () => {
    await request(Url)
      .get('/category')
      .expect(200)
      .expect((response) => {
        expect(Array.isArray(response.body)).toBe(true);            
        expect(response.body.length).toBeGreaterThan(0); 
        response.body.forEach((category) => {
          expect(category).toHaveProperty('id');
          expect(category).toHaveProperty('name');
          expect(category).toHaveProperty('color');
          expect(category).toHaveProperty('icon');  
          expect(category).toHaveProperty('products'); 
          expect(category).toHaveProperty('createdAt'); 
          expect(category).toHaveProperty('updatedAt'); 
        });
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/category/${categoryId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', categoryId);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('color');
        expect(response.body).toHaveProperty('icon');  
        expect(response.body).toHaveProperty('products'); 
        expect(response.body).toHaveProperty('createdAt'); 
        expect(response.body).toHaveProperty('updatedAt'); 
      });
  });


  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/category/${categoryId}`)
      .send()
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('id', categoryId);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('color');
        expect(response.body).toHaveProperty('icon');  
        expect(response.body).toHaveProperty('createdAt'); 
        expect(response.body).toHaveProperty('updatedAt'); 
      });
  });


  it('/ (DELETE:id)', async () => {
    await request(Url)
      .delete(`/category/${categoryId}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual({});
      });
  });
});