import { Entity, Column } from "typeorm";
import AbstractEntity from "./abstract.entity";

@Entity()
class Address extends AbstractEntity 
{
    @Column()
    line1: string;

    @Column()
    pincode: string;
}

export default Address;