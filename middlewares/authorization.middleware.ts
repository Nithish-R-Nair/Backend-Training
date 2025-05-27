import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";
import { EmployeeRole } from "../entities/employee.entity";


export function checkRole(employeeRoles: EmployeeRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role as EmployeeRole;
        if(!employeeRoles.includes(role))
            throw new HttpException(403, "User has no pevilage to access the resource");
        next();
    }
}
