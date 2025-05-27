import Department from "../entities/department.entity";
import HttpException from "../exceptions/httpException";
import DepartmentRepository from "../repositories/department.repository";
import { LoggerService } from "./logger.service";

const logger = LoggerService.getInstance("app()");

class DepartmentService
{
    constructor(private departmentRepository: DepartmentRepository)
    {

    }
    
    async createDepartment(name: string): Promise<Department>
    {
        const newDepartment: Department = new Department();
        newDepartment.name = name;
        logger.info(`Created new department entity | Name : ${newDepartment.name}`);
        const department = this.departmentRepository.create(newDepartment);
        if(!department)
            throw new HttpException(400, "Department cannot be created");
        return department;
    }

    async getAllDepartments(): Promise<Department[]>
    {
        return this.departmentRepository.findMany();
    }

    async getDepartmentById(id: number): Promise<Department>
    {
        const department = this.departmentRepository.findOneById(id) 
        if(!department)
            throw new HttpException(404, "Department not found");
        return department;
    }

    async getDepartmentByName(name: string): Promise<Department>
    {
        return this.departmentRepository.findOneByName(name);
    }

    async updateDepartment(id: number, name: string): Promise<void> 
    {
        const existingDepartment: Department = await this.departmentRepository.findOneById(id);
        if(!existingDepartment)
            throw new HttpException(404, "Department not found");
        const updatedDepartment: Department = new Department();
        updatedDepartment.name = name;
        logger.info(`Created new department update entity | Name : ${updatedDepartment.name}`);
        await this.departmentRepository.update(id, updatedDepartment);
    }

    async deleteDepartment(id: number): Promise<void> 
    {
        const existingDepartment: Department = await this.departmentRepository.findOneById(id);
        if(!existingDepartment)
            throw new HttpException(404, "Department not found");
        logger.info(`Dpeartment entity exists | Name : ${existingDepartment.name}`);
        await this.departmentRepository.delete(existingDepartment);
    }
}

export default DepartmentService;