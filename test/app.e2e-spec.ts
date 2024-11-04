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
        expect(response.body).toEqual({ message: 'user created', id: response.body.id });
      });
  });

  it('/ (GET)', async () => {
    await request(Url)
      .get('/user')
      .expect(200)
      .expect((response) => {
        
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/user/${userId}`)
      .expect(200)
      .expect((response) => {
        
         expect(response.body).toHaveProperty('id', userId);       
         expect(response.body).toHaveProperty('firstName');                
         expect(response.body).toHaveProperty('email');               
        //  expect(response.body).not.toHaveProperty('password'); 
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
         expect(response.body).toHaveProperty('email');               
        //  expect(response.body).not.toHaveProperty('password'); 
      });
  });


  it('/ (DELETE:id)', async () => {
    await request(Url)
      .delete(`/user/${userId}`)
      .expect(200)
      .expect((response) => {
        
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
        
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/products/${productId}`)
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toHaveProperty('id', productId)

      });
  });


  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/products/${productId}`)
      .send({price : "78"})
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toHaveProperty('id', productId)
      });
  });


  it('/ (DELETE:id)', async () => {
    await request(Url)
      .delete(`/products/${productId}`)
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toEqual({})
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
        
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/order-product/${opId}`)
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toHaveProperty('id', opId)

      });
  });


  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/order-product/${opId}`)
      .send()
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toHaveProperty('id', opId)
      });
  });


  it('/ (DELETE:id)', async () => {
    await request(Url)
      .delete(`/order-product/${opId}`)
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toEqual({})
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
        
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/order/${orderId}`)
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toHaveProperty('id', orderId)

      });
  });


  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/order/${orderId}`)
      .send()
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toHaveProperty('id', orderId)
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
        
        categoryId = response.body.id
        expect(response.body).toEqual({message: 'New Category Created', id:response.body.id});
      });
  });

  it('/ (GET)', async () => {
    await request(Url)
      .get('/category')
      .expect(200)
      .expect((response) => {
        
      });
  });

  it('/ (GET:id)', async () => {
    await request(Url)
      .get(`/category/${categoryId}`)
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toHaveProperty('id', categoryId)

      });
  });


  it('/ (PATCH:id)', async () => {
    await request(Url)
      .patch(`/category/${categoryId}`)
      .send()
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toHaveProperty('id', categoryId)
      });
  });


  it('/ (DELETE:id)', async () => {
    await request(Url)
      .delete(`/category/${categoryId}`)
      .expect(200)
      .expect((response) => {
        
        expect(response.body).toEqual({})
      });
  });
});