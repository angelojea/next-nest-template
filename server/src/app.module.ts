import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { UserController } from "@/controllers/user.controller";
import { UserService } from "@/services/user.service";
import { User } from "./entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { AddressType } from "./entities/address-type.entity";
import { Address } from "./entities/address.entity";
import { AddressService } from "./services/address.service";
import { AddressTypeService } from "./services/address-type.service";
import { AddressController } from "./controllers/address.controller";
import { AddressTypeController } from "./controllers/address-type.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Address, AddressType]),
    AuthModule,
    AuthModule.jwtService,
  ],
  controllers: [AppController, UserController, AddressController, AddressTypeController],

  providers: [AppService, UserService, AddressService, AddressTypeService],
})
export class AppModule {}
