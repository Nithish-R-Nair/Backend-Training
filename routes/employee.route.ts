import express from "express";
import dataSource from "../db/data-source";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import EmployeeService from "../services/employee.service";
import EmployeeController from "../controllers/employee.controller";


const employeeRouter = express.Router();
const employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(employeeService, employeeRouter);

export default employeeRouter;