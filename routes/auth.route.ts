import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";
import { Router } from "express";
import { employeeService } from "./employee.route";

const authRouter: Router = Router();
const authService: AuthService = new AuthService(employeeService);
const authController: AuthController = new AuthController(authService, authRouter);

export default authRouter;