import { Entity, Column } from "typeorm";
import AbstractEntity from "./abstract.entity";

@Entity()
class Employee extends AbstractEntity
{
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  age: number;
}
  
export default Employee;
  