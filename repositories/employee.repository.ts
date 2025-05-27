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
            relations: { 
                address: true,                  // Adds the address field from address table to the employee data on fetch
                department: true                // Adds the department field from department table to the employee data on fetch
            }            
        });
    }

    async findOneById(id: number): Promise<Employee>
    {
        return this.repository.findOne({
            where: { id },
            relations: { 
                address: true,
                department: true
            }
        });
    }

    async findOneByEmail(email: string): Promise <Employee | null>
    {
        return this.repository.findOne({
            where: { email },
            relations: { 
                address: true, 
                department: true 
            }
        });
    }

    async update(id: number, employee: Employee): Promise<void> 
    {
        await this.repository.save({ id, ...employee });
    }

    async delete(employee: Employee): Promise<void> 
    {
        await this.repository.softRemove(employee);             
    }
}

export default EmployeeRepository;