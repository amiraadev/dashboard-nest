import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @Length(2, 50)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  picturePath?: string;
  location?: string;
  occupation?: string;
}
export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
