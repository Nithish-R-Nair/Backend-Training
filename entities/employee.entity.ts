import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";

export enum EmployeeRole {
  UI = "UI",
  UX = "UX",
  DEVELOPER = "DEVELOPER",
  HR = "HR"
};

@Entity()
class Employee extends AbstractEntity
{
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToOne(() => Address, (address) => address.employee, {
   cascade: true
  })
  address: Address

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: EmployeeRole,
    default: EmployeeRole.DEVELOPER
  })
  role: EmployeeRole;
}
  
export default Employee;
  