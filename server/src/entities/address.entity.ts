import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { AddressType } from "./address-type.entity";

@Entity()
export class Address {
  constructor(partial: Partial<Address>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zipCode: string;

  @ManyToOne(() => AddressType, (add) => add.addresses)
  @JoinTable()
  addressType: AddressType;
}
