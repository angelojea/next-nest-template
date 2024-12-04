import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Address } from "../entities/address.entity";
import * as bcrypt from "bcrypt";
import { CreateAddressDto } from "@/dtos/address.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly userRepository: Repository<Address>
  ) {}

  // Create a new user
  async create(dto: CreateAddressDto): Promise<Address> {
    const newAddress = this.userRepository.create(dto);
    return this.userRepository.save(newAddress);
  }

  // Get all users
  async findAll(): Promise<Address[]> {
    return this.userRepository.find() || [];
  }

  // Get a single user by ID
  async findOne(id: number): Promise<Address> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Update a user
  async update(id: number, updateData: Partial<Address>): Promise<Address> {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
