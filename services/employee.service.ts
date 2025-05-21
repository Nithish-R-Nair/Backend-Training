import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";


class EmployeeService
{
    constructor(private employeeRepository: EmployeeRepository)
    {

    }
    
    async createEmployee(email: string, name: string): Promise<Employee>
    {
        const newEmployee: Employee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]>
    {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee>
    {
        return this.employeeRepository.findOneById(id);
    }

    async updateEmployee(id: number, email: string, name: string): Promise<void> 
    {
        const existingEmployee: Employee = await this.employeeRepository.findOneById(id);
        if(existingEmployee)
        {
            const updatedEmployee: Employee = new Employee();
            updatedEmployee.name = name;
            updatedEmployee.email = email;
            await this.employeeRepository.update(id, updatedEmployee);
        }
    }

    async deleteEmployee(id: number): Promise<void> 
    {
        const existingEmployee: Employee = await this.employeeRepository.findOneById(id);
        if(existingEmployee)
        {
            await this.employeeRepository.delete(id);
        }
    }
}

export default EmployeeService;