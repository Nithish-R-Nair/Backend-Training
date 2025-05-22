import { Request, Response, Router } from "express";
import DepartmentService from "../services/department.service";
import Department from "../entities/department.entity";

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

    async createDepartment(req: Request, res: Response)
    {
        const { name } = req.body;
        const newDepartment = await this.departmentService.createDepartment(name);
        res.status(201).send(newDepartment);
    }

    async getAllDepatments(req: Request, res: Response)
    {
        const departments: Department[] = await this.departmentService.getAllDepartments();
        res.status(200).send(departments);
    }

    async getDepartmentById(req: Request, res: Response)
    {
        const id = Number(req.params.id);
        const department = await this.departmentService.getDepartmentById(id);
        res.status(200).send(department);
    }

    async updateDepartment(req: Request, res: Response)
    {
        const id = Number(req.params.id);
        const { name } = req.body;
        await this.departmentService.updateDepartment(id, name);
        res.status(200).send();
    }

    async deleteDepartment(req: Request, res: Response)
    {
        const id = Number(req.params.id);
        await this.departmentService.deleteDepartment(id);
        res.status(204).send();
    }
}


export default DepartmentController;