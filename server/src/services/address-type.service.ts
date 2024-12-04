import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAddressTypeDto } from "@/dtos/address-type.dto";
import { AddressType } from "@/entities/address-type.entity";

@Injectable()
export class AddressTypeService {
  constructor(
    @InjectRepository(AddressType)
    private readonly userRepository: Repository<AddressType>
  ) {}

  // Create a new user
  async create(dto: CreateAddressTypeDto): Promise<AddressType> {
    const newAddressType = this.userRepository.create(dto);
    return this.userRepository.save(newAddressType);
  }

  // Get all users
  async findAll(): Promise<AddressType[]> {
    return this.userRepository.find() || [];
  }

  // Get a single user by ID
  async findOne(id: number): Promise<AddressType> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Update a user
  async update(id: number, updateData: Partial<AddressType>): Promise<AddressType> {
    await this.userRepository.update(id, updateData);
    return this.userRepository.findOne({ where: { id } });
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
