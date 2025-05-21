import express from "express";
import Employee from "./employee.entity";
import dataSource from "./data-source";

const employeeRouter = express.Router();

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = dataSource.getRepository(Employee);
  const employees = await employeeRepository.find();
  res.status(200).send(employees);
});

employeeRouter.get("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = dataSource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({ id: empId });
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;

  const employeeRepository = dataSource.getRepository(Employee);
  await employeeRepository.insert(newEmployee);
  res.status(201).send(newEmployee);
});

employeeRouter.delete("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const employeeRepository = dataSource.getRepository(Employee);
  const employee = await employeeRepository.delete({ id: empId });
  res.status(204).send();
});

employeeRouter.patch("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const updatedValues = {
    name: req.body.name,
    email: req.body.email
  };
  const employeeRepository = dataSource.getRepository(Employee);
  await employeeRepository.update({ id: empId }, updatedValues);
  const employee = await employeeRepository.findOneBy({ id: empId });
  res.status(200).send(employee);
});

employeeRouter.put("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const updatedValues = {
    name: req.body.name ?? "",
    email: req.body.email ?? ""
  };
  const employeeRepository = dataSource.getRepository(Employee);
  await employeeRepository.update({ id: empId }, updatedValues);
  const employee = await employeeRepository.findOneBy({ id: empId });
  res.status(200).send(employee);
});

export default employeeRouter;
