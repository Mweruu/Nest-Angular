import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// {
//     firstName?: string; 
//     lastName?: string;
//     email?: string;
//     role?: Role;
//     orders?: Order[];
//     products?: Product[];
//     password?: string;
// }
