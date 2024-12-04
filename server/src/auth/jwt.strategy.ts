import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Ensure the token is not expired
      secretOrKey: "my-secret-key", // Use the same secret as in JwtModule
    });
  }

  async validate(payload: any) {
    // The payload contains the data you signed the token with
    // For example: { username, sub (userId) }
    return { userId: payload.sub, username: payload.username };
  }
}
