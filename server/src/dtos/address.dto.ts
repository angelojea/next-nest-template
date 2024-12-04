import { AddressType } from "@/entities/address-type.entity";
import { Length, IsEmail } from "class-validator";

export class CreateAddressDto {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  addressType: AddressType;
}

export class UpdateAddressDto {}
