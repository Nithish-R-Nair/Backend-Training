import { NextFunction, Request, Response, Router } from "express";
import DepartmentService from "../services/department.service";
import Department from "../entities/department.entity";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import HttpException from "../exceptions/httpException";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";

class DepartmentController
{
    constructor(private departmentService: DepartmentService, router: Router)
    {
        router.get("/", this.getAllDepatments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.post("/", this.createDepartment.bind(this));
        router.put("/:id", this.updateDepartment.bind(this));
        router.delete("/:id", this.deleteDepartment.bind(this));
    }

    async createDepartment(req: Request, res: Response, next: NextFunction)
    {
        try {
            const createDepartmentDto: CreateDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const newDepartment = await this.departmentService.createDepartment(createDepartmentDto.name);
            if(!newDepartment) {
                throw new HttpException(404, "Department not found");
            }
            res.status(201).send(newDepartment);
        } catch(error) {
            next(error);
        }
    }

    async getAllDepatments(req: Request, res: Response)
    {
        const departments: Department[] = await this.departmentService.getAllDepartments();
        res.status(200).send(departments);
    }

    async getDepartmentById(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = Number(req.params.id);
            const department = await this.departmentService.getDepartmentById(id);
            if(!department)
                throw new HttpException(404, "Department not found");
            res.status(200).send(department);
        } catch (error) {
            next(error);
        }
    }

    async updateDepartment(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = Number(req.params.id);
            const updateDepartmentDto: UpdateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
            const errors = await validate(updateDepartmentDto);
             if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            await this.departmentService.updateDepartment(id, updateDepartmentDto.name);
            res.status(200).send();
        } catch(error) {
            next(error);
        }
    }

    async deleteDepartment(req: Request, res: Response, next: NextFunction)
    {
        try {
            const id = Number(req.params.id);
            await this.departmentService.deleteDepartment(id);
            res.status(204).send();
        } catch(error) {
            next(error);
        }
    }
}


export default DepartmentController;