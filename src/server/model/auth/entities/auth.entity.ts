import {
    Column,
    Entity,
  } from 'typeorm';

  
  @Entity()
  export class Auth {
    @Column()
    email: string;
  
    @Column()
    password: string;
  }