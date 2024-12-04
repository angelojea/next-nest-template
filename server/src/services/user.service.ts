import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "@/dtos/user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // Create a new user
  async create(dto: CreateUserDto): Promise<User> {
    const payload = new User(dto);
    payload.roles = ["employee"];
    if (dto.isAdmin) {
      payload.roles.push("admin");
    }

    if (payload.password) {
      // Hash the password
      payload.password = await bcrypt.hash(payload.password, 10);
    }
    if (!payload.username) {
      payload.username = payload.email;
    }

    const newUser = this.userRepository.create(payload);
    return this.userRepository.save(newUser);
  }

  // Get all users
  async findAll(page: number = 1, pageSize: number = 10): Promise<User[]> {
    const skip = (page - 1) * pageSize;
    return (
      this.userRepository.find({
        skip,
        take: pageSize,
        order: { id: "ASC" },
      }) || []
    );
  }

  // Get a single user by ID
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Update a user
  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
