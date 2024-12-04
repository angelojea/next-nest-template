import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthUserDto {
  constructor(partial: Partial<CreateAuthUserDto>) {
    Object.assign(this, partial);
  }
  @MinLength(4)
  @IsString()
  firstname: string;

  @MinLength(4)
  @IsString()
  lastname: string;

  @MinLength(8)
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsEmail()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  constructor(partial: Partial<CreateAuthUserDto>) {
    Object.assign(this, partial);
  }
  @IsEmail()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(4)
  password: string;
}
