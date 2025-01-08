import { PartialType } from '@nestjs/swagger';
import { signInDto } from './signin.dto';

export class UpdateSignInDto extends PartialType(signInDto) {}

// {
//     email?: string;
//     password?: string;
// }
