import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";
import { EmployeeRole } from "../entities/employee.entity";


// write a wrapper function over the middleware below
// Function accepts a set of roles
// Returns a middleware

const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if(role !== EmployeeRole.HR)
        throw new HttpException(403, "User has no pevilage to access the resource");
    next();
}

// A demo that accepts a single role is given below 

// export function getRole(employeeRole: EmployeeRole) {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const role = req.user?.role;
//         if(role !== employeeRole)
//             throw new HttpException(403, "User has no pevilage to access the resource");
//         next();
//     }
// }

export default authorizationMiddleware;