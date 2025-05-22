import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from "bcrypt";

class EmployeeService
{
    constructor(private employeeRepository: EmployeeRepository)
    {

    }
    
    async createEmployee(email: string, name: string, age: number, address: CreateAddressDto, password: string, role: EmployeeRole): Promise<Employee>
    {
        const newAddress: Address = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        
        const newEmployee: Employee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.address = newAddress;
        newEmployee.password = await bcrypt.hash(password, 10);
        newEmployee.role = role;
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

    async getEmployeeByEmail(email: string): Promise<Employee | null>
    {
        return this.employeeRepository.findOneByEmail(email);
    }

    async updateEmployee(id: number, email: string, name: string, age: number, address: CreateAddressDto): Promise<void> 
    {
        const existingEmployee: Employee = await this.employeeRepository.findOneById(id);
        if(existingEmployee)
        {
            const updatedEmployee: Employee = new Employee();
            updatedEmployee.name = name;
            updatedEmployee.email = email;
            updatedEmployee.age = age;
            
            updatedEmployee.address = new Address();
            updatedEmployee.address.line1 = address.line1;
            updatedEmployee.address.pincode = address.pincode;
            await this.employeeRepository.update(id, updatedEmployee);
        }
    }

    async deleteEmployee(id: number): Promise<void> 
    {
        const existingEmployee: Employee = await this.employeeRepository.findOneById(id);
        if(existingEmployee)
            await this.employeeRepository.delete(existingEmployee);
    }
}

export default EmployeeService;