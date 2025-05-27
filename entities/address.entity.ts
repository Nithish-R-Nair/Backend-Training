import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity 
{
    @Column()
    line1: string;

    @Column()
    pincode: string;

    @Column()
    houseNo: string;

    @Column()
    line2: string;

    @OneToOne(() => Employee, (employee) => employee.address, { onDelete: 'CASCADE' })
    @JoinColumn()
    employee: Employee;
}

export default Address;