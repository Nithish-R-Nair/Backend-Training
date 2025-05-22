import { JwtPayload } from "../dto/jwt-payload";
import HttpException from "../exceptions/httpException";
import EmployeeService from "./employee.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";


class AuthService
{
    constructor(private employeeService: EmployeeService)
    {

    }

    async login(email: string, password: string)
    {
        const employee = await this.employeeService.getEmployeeByEmail(email);
        if(!employee)
            throw new HttpException(404, "User not found");
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if(!isPasswordValid)
            throw new HttpException(400, "Invalid password");
        
        // JWT Token
        const payload: JwtPayload = {
            id: employee.id,
            email: employee.email,
            role: employee.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_VALIDITY });
        return {
            tokenType: "Bearer",
            accesToken: token
        };
    }
}


export default AuthService;