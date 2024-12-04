import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "@/dtos/user.dto";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { Roles } from "@/auth/roles.decorator";
import { validateOrReject } from "class-validator";
import { AddressTypeService } from "@/services/address-type.service";
import { CreateAddressTypeDto } from "@/dtos/address-type.dto";

@Controller("address-type")
export class AddressTypeController {
  constructor(private readonly svc: AddressTypeService) {}

  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  @Post()
  async create(@Body() dto: CreateAddressTypeDto) {
    try {
      await validateOrReject(dto);
      return await this.svc.create(dto);
    } catch (error) {
      console.error("Validation failed:", error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles("admin", "employee")
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.svc.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.svc.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(+id);
  }
}
