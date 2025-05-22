import { Request, Response, NextFunction, Router } from "express"
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";
import HttpException from "../exceptions/httpException";
import { CreateEmployeeDto } from "../dto/create-employee.dto ";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import authorizationMiddleware from "../middlewares/authorization.middleware";

class EmployeeController
{
    constructor(private employeeService: EmployeeService, router: Router)
    {
        // Using normal js functions with bind
        router.post("/", authorizationMiddleware, this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        
        // Using arrow functions without bind
        router.put("/:id", authorizationMiddleware, this.updateEmployee);
        router.delete("/:id", authorizationMiddleware, this.deleteEmployee);
    }

    // Using nomral js functions and explicitly binding this using bind function
    async createEmployee(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try {
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            const savedEmployee = await this.employeeService.createEmployee(
                createEmployeeDto.email,
                createEmployeeDto.name,
                createEmployeeDto.age,
                createEmployeeDto.address,
                createEmployeeDto.password,
                createEmployeeDto.role
            );
            res.status(201).send(savedEmployee);
        } catch (error) {
            next(error);
        }
    }

    async getAllEmployees(req: Request, res: Response): Promise<void>
    {
        console.log(req.user);
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
    updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> =>
    {
        try {
            const id: number = Number(req.params.id);
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, JSON.stringify(errors));
            }
            await this.employeeService.updateEmployee(
                id, 
                createEmployeeDto.email, 
                createEmployeeDto.name, 
                createEmployeeDto.age, 
                createEmployeeDto.address
            );
            res.status(200).send();
        } catch(err) {
            console.log(err);
            next(err);
        }
    }

    deleteEmployee = async (req: Request, res: Response): Promise<void> =>
    {
        const id: number = Number(req.params.id);
        await this.employeeService.deleteEmployee(id);
        res.status(204).send();
    }
}

export default EmployeeController;