/* eslint-disable prettier/prettier */
import { IsString, IsEmail ,IsNotEmpty} from 'class-validator';
export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
