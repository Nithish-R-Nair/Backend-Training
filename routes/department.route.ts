import express from "express";
import dataSource from "../db/data-source";
import Department from "../entities/department.entity";
import DepartmentService from "../services/department.service";
import DepartmentController from "../controllers/department.controller";
import DepartmentRepository from "../repositories/department.repository";

const departmentRouter = express.Router();
const departmentRepository = new DepartmentRepository(dataSource.getRepository(Department));
const departmentService = new DepartmentService(departmentRepository);
const departmentController = new DepartmentController(departmentService, departmentRouter);

export default departmentRouter;