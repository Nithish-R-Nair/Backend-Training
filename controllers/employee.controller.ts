import { Request, Response, NextFunction, Router } from "express"
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";
import Address from "../entities/address.entity";
import HttpException from "../exceptions/httpException";
import { isEmail } from "../validators/emailValidator";

class EmployeeController
{
    constructor(private employeeService: EmployeeService, router: Router)
    {
        // Using normal js functions with bind
        router.post("/", this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        
        // Using arrow functions without bind
        router.put("/:id", this.updateEmployee);
        router.delete("/:id", this.deleteEmployee);
    }

    // Using nomral js functions and explicitly binding this using bind function
    async createEmployee(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try {
            const { email, name, age, address } = req.body;
            if(!isEmail(email))
                throw new HttpException(400, "Invalid email");
            const savedEmployee: Employee = await this.employeeService.createEmployee(email, name, age, address);
            res.status(201).send(savedEmployee);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async getAllEmployees(req: Request, res: Response): Promise<void>
    {
        const employees: Employee[] = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }
    
    async getEmployeeById(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try {
            const id: number = Number(req.params.id);
            const employee: Employee = await this.employeeService.getEmployeeById(id);
            if(!employee)
                throw new HttpException(404, "Employee not found");
            res.status(200).send(employee);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    
    // Using arrow functions to automatically bind to the this keyword
    updateEmployee = async (req: Request, res: Response): Promise<void> =>
    {
        const id: number = Number(req.params.id);
        const { email, name, age, address } = req.body;
        await this.employeeService.updateEmployee(id, email, name, age, address);
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