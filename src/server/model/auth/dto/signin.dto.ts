import {
  IsAlphanumeric,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class signInDto {  // Add Examples
  @ApiProperty({
    example: 'jane@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Mweru123',
  })
  @IsAlphanumeric()
  password: string;
}
