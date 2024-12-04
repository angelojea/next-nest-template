import { RoleType } from "@/auth/roles.decorator";
import { Length, IsEmail } from "class-validator";

export class CreateUserDto {
  @Length(4, 50)
  firstname: string;

  @Length(4, 50)
  lastname: string;

  @Length(4, 50)
  jobtitle: string;

  @IsEmail()
  email: string;

  @Length(4, 30)
  username: string;

  @Length(4, 30)
  password: string;

  isAdmin: boolean;

  birthdate: Date;

  startdate: Date;
}

export class UpdateUserDto {}
