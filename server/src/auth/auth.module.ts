import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "../entities/user.entity";
import { JwtStrategy } from "./jwt.strategy";

const JwtService = JwtModule.register({
  secret: "my-secret-key", // Replace with your secret key
  signOptions: { expiresIn: "8h" },
});

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtService, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {
  public static jwtService = JwtService;
}
