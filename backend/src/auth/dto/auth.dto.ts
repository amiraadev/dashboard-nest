import { IsString, IsEmail, IsNotEmpty, Length, IsOptional } from 'class-validator';

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
  @IsOptional()
  picturePath?: string;
  @IsOptional()
  location?: string;
  @IsOptional()
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
