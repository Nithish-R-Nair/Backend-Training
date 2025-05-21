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
        return this.repository.find();
    }

    async findOneById(id: number): Promise<Employee>
    {
        return this.repository.findOneBy({ id });
    }

    async update(id: number, employee: Employee): Promise<void> 
    {
        await this.repository.save({ id, ...employee });
    }

    async delete(id: number): Promise<void> 
    {
        await this.repository.delete({ id });       
    }
}

export default EmployeeRepository;