import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthUserDto, LoginDto } from "@/auth/dto";
import { validateOrReject } from "class-validator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: CreateAuthUserDto, @Res({ passthrough: true }) response: Response) {
    // Request Validation
    try {
      await validateOrReject(new CreateAuthUserDto(dto));
    } catch (error) {
      throw new BadRequestException();
    }

    // Business Logic
    try {
      await this.authService.register(dto);
      const token = await this.authService.login({ password: dto.password, username: dto.username });
      if (!token) {
        throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
      }
      //@ts-ignore
      response.cookie("aoj-token", token);
      return;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    // Request Validation
    try {
      await validateOrReject(new LoginDto(dto));
    } catch (error) {
      throw new BadRequestException();
    }

    // Business Logic
    try {
      const token = await this.authService.login(dto);
      if (!token) {
        throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
      }
      //@ts-ignore
      response.cookie("aoj-token", token);
      return;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
