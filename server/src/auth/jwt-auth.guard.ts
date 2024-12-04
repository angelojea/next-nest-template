import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY, RoleType } from "@/auth/roles.decorator";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "@/auth/auth.service";
import { IncomingMessage } from "http";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  static jwtService: JwtService;
  constructor(
    private reflector: Reflector,
    private readonly _jwtService: JwtService
  ) {
    JwtAuthGuard.jwtService = _jwtService;
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) as RoleType[];

    if (!requiredRoles) {
      return true; // No roles required for this route
    }

    const request = context.switchToHttp().getRequest();
    if (!requiredRoles.some((role) => JwtAuthGuard.hasRole(request, role))) {
      throw new ForbiddenException("You do not have the required roles to access this resource");
    }

    return true;
  }

  static getToken(request: IncomingMessage): JwtPayload {
    const token = request?.headers?.authorization?.replace(/Bearer\s/g, "");
    if (!token) throw new UnauthorizedException();

    return this.jwtService.decode(token) as JwtPayload;
  }

  static hasRole(request: IncomingMessage, role: RoleType) {
    const token = request?.headers?.authorization?.replace(/Bearer\s/g, "");
    if (!token) return false;

    const { roles } = this.jwtService.decode(token) as JwtPayload;
    return roles?.includes(role);
  }
}
