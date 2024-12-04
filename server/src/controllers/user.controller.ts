import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
  Search,
  Query,
} from "@nestjs/common";
import { UserService } from "@/services/user.service";
import { CreateUserDto, UpdateUserDto } from "@/dtos/user.dto";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { Roles } from "@/auth/roles.decorator";
import { validateOrReject } from "class-validator";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      await validateOrReject(dto);
      return await this.userService.create(dto);
    } catch (error) {
      console.error("Validation failed:", error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles("admin", "employee")
  @Get()
  findAll(@Query() { page, pageSize }) {
    return this.userService.findAll(page, pageSize);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("admin", "employee")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
