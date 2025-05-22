import Department from "../entities/department.entity";
import DepartmentRepository from "../repositories/department.repository";

class DepartmentService
{
    constructor(private departmentRepository: DepartmentRepository)
    {

    }
    
    async createDepartment(name: string): Promise<Department>
    {
        const newDepartment: Department = new Department();
        newDepartment.name = name;
        return this.departmentRepository.create(newDepartment);
    }

    async getAllDepartments(): Promise<Department[]>
    {
        return this.departmentRepository.findMany();
    }

    async getDepartmentById(id: number): Promise<Department>
    {
        return this.departmentRepository.findOneById(id);
    }

    async updateDepartment(id: number, name: string): Promise<void> 
    {
        const existingDepartment: Department = await this.departmentRepository.findOneById(id);
        if(existingDepartment)
        {
            const updatedDepartment: Department = new Department();
            updatedDepartment.name = name;
            await this.departmentRepository.update(id, updatedDepartment);
        }
    }

    async deleteDepartment(id: number): Promise<void> 
    {
        const existingDepartment: Department = await this.departmentRepository.findOneById(id);
        if(existingDepartment)
            await this.departmentRepository.delete(existingDepartment);
    }
}

export default DepartmentService;