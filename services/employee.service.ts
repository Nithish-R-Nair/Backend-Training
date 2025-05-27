import Address from "../entities/address.entity";
import Department from "../entities/department.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from "bcrypt";
import HttpException from "../exceptions/httpException";
import Employee, { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import { CreateAddressDto } from "../dto/create-address.dto";
import { LoggerService } from "./logger.service";
import DepartmentService from "./department.service";

const logger = LoggerService.getInstance("app()");

class EmployeeService
{
    constructor(private employeeRepository: EmployeeRepository, private departmentService: DepartmentService)
    {
        
    }
    
    async createEmployee(
        email: string, 
        name: string, 
        age: number, 
        address: CreateAddressDto, 
        password: string, 
        role: EmployeeRole, 
        departmentId: number,
        employeeId: string,
        dateOfJoining: Date,
        experience: number,
        status: EmployeeStatus
    ): Promise<Employee>
    {
        const newAddress: Address = new Address();
        newAddress.houseNo = address.houseNo;
        newAddress.line1 = address.line1;
        newAddress.line2 = address.line2;
        newAddress.pincode = address.pincode;
        
        const newDepartment: Department = await this.departmentService.getDepartmentById(departmentId);
        if(!newDepartment)
            throw new HttpException(404, "Department not found");

        const newEmployee: Employee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.address = newAddress;
        newEmployee.password = await bcrypt.hash(password, 10);
        newEmployee.role = role;
        newEmployee.department = newDepartment;
        newEmployee.employeeId = employeeId;
        newEmployee.dateOfJoining = dateOfJoining;
        newEmployee.experience = experience;
        newEmployee.status = status;

        logger.info(`Employee entity created | Name : ${newEmployee.name}`);
        return this.employeeRepository.create(newEmployee);
        
    }

    async getAllEmployees(): Promise<Employee[]>
    {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee>
    {
        const employee = this.employeeRepository.findOneById(id);
        if(!employee)
            throw new HttpException(404, "Employee not found");
        return employee;
    }

    async getEmployeeByEmail(email: string): Promise<Employee | null>
    {
        return this.employeeRepository.findOneByEmail(email);
    }

    async updateEmployee(
        id: number, 
        email: string, 
        name: string, 
        age: number, 
        address: CreateAddressDto, 
        password: string, 
        role: EmployeeRole, 
        departmentId: number,
        employeeId: string,
        dateOfJoining: Date,
        experience: number,
        status: EmployeeStatus
    ): Promise<void> 
    {
        const existingEmployee: Employee = await this.employeeRepository.findOneById(id);
        if(!existingEmployee)
            throw new HttpException(404, "Employee doesnot exists");
        
        const updatedAddress: Address = new Address();
        updatedAddress.houseNo = address.houseNo;
        updatedAddress.line1 = address.line1;
        updatedAddress.line2 = address.line2;
        updatedAddress.pincode = address.pincode;
        
        const updatedDepartment: Department = await this.departmentService.getDepartmentById(departmentId);
        if(!updatedDepartment)
            throw new HttpException(404, "Department not found");

        logger.info(`Department exists | Name : ${updatedDepartment.name}`);
        
        const updatedEmployee: Employee = new Employee();
        updatedEmployee.name = name;
        updatedEmployee.email = email;
        updatedEmployee.age = age;
        updatedEmployee.address = updatedAddress;
        updatedEmployee.password = await bcrypt.hash(password, 10);
        updatedEmployee.role = role;
        updatedEmployee.department = updatedDepartment;
        updatedEmployee.employeeId = employeeId;
        updatedEmployee.dateOfJoining = dateOfJoining;
        updatedEmployee.experience = experience;
        updatedEmployee.status = status;
        
        logger.info(`Employee update entity created | Name : ${updatedEmployee.name}`);
        
        await this.employeeRepository.update(id, updatedEmployee);
    }

    async deleteEmployee(id: number): Promise<void> 
    {
        const existingEmployee: Employee = await this.employeeRepository.findOneById(id);
        if(!existingEmployee)
            throw new HttpException(404, "Employee not found");
        logger.info(`Employee exists | Name : ${existingEmployee.name}`);
        await this.employeeRepository.delete(existingEmployee);
    }
}

export default EmployeeService;