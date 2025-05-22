import HttpException from "../exceptions/httpException";
import AuthService from "../services/auth.service";
import { Router, Request, Response, NextFunction } from "express";

class AuthController 
{
    constructor(private authService: AuthService, router: Router)
    {
        router.post("/login", this.login.bind(this));
    }

    async login(req: Request, res: Response, next: NextFunction)
    {
        try {
            const { email, password } = req.body;
            if(!email || !password)
                throw new HttpException(400, "Email and Password are required");
            const data = await this.authService.login(email, password);
            res.status(200).send(data);
        } catch(error) {
            console.log(error);
            next(error);
        }
    }

}


export default AuthController;