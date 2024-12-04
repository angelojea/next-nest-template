import { RoleType } from "@/auth/roles.decorator";
import { IsEmail, IsString, Length } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ nullable: true })
  jobtitle: string;

  @Column()
  @Index("unique_email", ["email"], { unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  password: string;

  @Column({ nullable: true, type: "simple-array" })
  roles: RoleType[];

  @Column({ nullable: true, type: "datetime" })
  birthdate: Date;

  @Column({ nullable: true, type: "datetime" })
  startdate: Date;
}
