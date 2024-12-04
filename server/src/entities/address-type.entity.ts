import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Address } from "./address.entity";

@Entity()
export class AddressType {
  constructor(partial: Partial<AddressType>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Address, (addT) => addT.addressType)
  addresses: Address[];
}
