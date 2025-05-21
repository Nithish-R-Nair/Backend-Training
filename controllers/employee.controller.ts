import { Request, Response, Router } from "express"
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";

class EmployeeController
{
    constructor(private employeeService: EmployeeService, router: Router)
    {
        // Normal js functions using bind
        router.post("/", this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        
        // Arrow functions not using bind
        router.put("/:id", this.updateEmployee);
        router.delete("/:id", this.deleteEmployee);
    }

    // Using nomral js functions and explicitly binding this using bind function
    async createEmployee(req: Request, res: Response): Promise<void>
    {
        const email: string = req.body.email;
        const name: string = req.body.name;
        const savedEmployee: Employee = await this.employeeService.createEmployee(email, name);
        res.status(201).send(savedEmployee);
    }

    async getAllEmployees(req: Request, res: Response): Promise<void>
    {
        const employees: Employee[] = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }
    
    async getEmployeeById(req: Request, res: Response): Promise<void>
    {
        const id: number = Number(req.params.id);
        const employee: Employee = await this.employeeService.getEmployeeById(id);
        res.status(200).send(employee);
    }
    
    // Using arrow functions to automatically bind to the this keyword
    updateEmployee = async (req: Request, res: Response): Promise<void> =>
    {
        const id: number = Number(req.params.id);
        const email: string = req.body.email;
        const name: string = req.body.name;
        await this.employeeService.updateEmployee(id, email, name);
        res.status(200).send();
    }

    deleteEmployee = async (req: Request, res: Response): Promise<void> =>
    {
        const id: number = Number(req.params.id);
        await this.employeeService.deleteEmployee(id);
        res.status(204).send();
    }
}

export default EmployeeController;