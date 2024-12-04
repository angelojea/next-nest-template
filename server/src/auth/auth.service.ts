import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateAuthUserDto, LoginDto } from "@/auth/dto";
import { RoleType } from "./roles.decorator";

export type JwtPayload = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  sub: number;
  roles: RoleType[];
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateAuthUserDto): Promise<User> {
    const { username, password, firstname, lastname } = createUserDto;

    // Check if username already exists
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new HttpException("Username already exists", HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const payload = new User({
      email: username,
      username,
      password: hashedPassword,
      firstname,
      lastname,
      roles: ["employee"],
    });

    // Create and save the user
    const newUser = this.userRepository.create(payload);
    return this.userRepository.save(newUser);
  }

  async login(loginDto: LoginDto): Promise<string | null> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const payload: JwtPayload = {
      email: user.email,
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      roles: user.roles,
      sub: user.id,
      username: user.username,
    };
    return this.jwtService.sign(payload);
  }
}
