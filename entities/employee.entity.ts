import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";

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
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn()
  address: Address;
}
  
export default Employee;
  