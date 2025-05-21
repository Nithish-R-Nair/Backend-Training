import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";

class EmployeeRepository 
{
    constructor(private repository: Repository<Employee>)
    {

    }

    async create(employee: Employee): Promise<Employee>
    {
        return this.repository.save(employee);
    }

    async findMany(): Promise<Employee[]>
    {
        return this.repository.find({
            relations: { address: true }            // Adds the address field from address table to the employee data on fetch
        });
    }

    async findOneById(id: number): Promise<Employee>
    {
        return this.repository.findOne({
            where: { id },
            relations: { address: true }
        });
    }

    async update(id: number, employee: Employee): Promise<void> 
    {
        await this.repository.save({ id, ...employee });
    }

    async delete(employee: Employee): Promise<void> 
    {
        // using "delete" doesnot cascade the deletion to the related tables (here "Address")
        // Hence remove is used
        await this.repository.remove(employee);             
    }
}

export default EmployeeRepository;