import { when } from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended';

import { CreateAddressDto } from '../../dto/create-address.dto';
import Employee, { EmployeeRole, EmployeeStatus } from "../../entities/employee.entity";
import EmployeeRepository from "../../repositories/employee.repository";
import EmployeeService from "../../services/employee.service";
import Department from '../../entities/department.entity';
import bcrypt from "bcrypt";
import Address from '../../entities/address.entity';
import DepartmentService from '../../services/department.service';

describe("EmployeeService", () => {
    let employeeRepository: MockProxy<EmployeeRepository>;
    let employeeService: EmployeeService;
    let departmentService: MockProxy<DepartmentService>;
    let mockAddressDto: MockProxy<CreateAddressDto>;
    let employee: Employee;
    let employeeId: number;
    let departmentId: number;

    beforeEach(() => {
        employeeRepository = mock<EmployeeRepository>();
        departmentService = mock<DepartmentService>();
        employeeService = new EmployeeService(employeeRepository, departmentService);

        employeeId = 1;
        departmentId = 1;
        employee = new Employee();
        mockAddressDto = mock<CreateAddressDto>();

        employee.email = "myEmail@gamil.com";
        employee.name = "myName";
        employee.age = 20;
        employee.address = new Address();
        employee.address.line1 = mockAddressDto.line1 = "Line1";
        employee.address.line2 = mockAddressDto.line2 = "Line2";
        employee.address.houseNo = mockAddressDto.houseNo = "HouseNo";
        employee.address.pincode = mockAddressDto.pincode = "123456";
        employee.password = "password";
        employee.role = EmployeeRole.DEVELOPER;
        employee.department = new Department();
        employee.department.id = departmentId;
        employee.employeeId = "EMP1";
        employee.dateOfJoining = mock<Date>();
        employee.experience = 3;
        employee.status = EmployeeStatus.ACTIVE;

        jest.spyOn(bcrypt, "hash").mockImplementation(jest.fn(async (pass, salt) => pass));
    });
    
    describe("createEmployee", () => {
        const createEmployeeFn = jest.fn(() => employeeService.createEmployee(
            employee.email,   
            employee.name,
            employee.age,
            mockAddressDto,
            employee.password,
            employee.role,
            departmentId,
            employee.employeeId,
            employee.dateOfJoining,
            employee.experience,
            employee.status
        ));

        it("should create and return the employee", async () => {
            when(employeeRepository.create).calledWith(employee).mockReturnValue(employee);            
            when(departmentService.getDepartmentById).calledWith(departmentId).mockReturnValue(employee.department);
            const createdEmployee = await createEmployeeFn();
            expect(departmentService.getDepartmentById).toHaveBeenCalledWith(departmentId);
            expect(employeeRepository.create).toHaveBeenCalledWith(employee);
            expect(createdEmployee).toEqual(employee);
        });

        it("should throw an error when department not found", async () => {
            when(departmentService.getDepartmentById).calledWith(departmentId).mockReturnValue(null);
            expect(createEmployeeFn()).rejects.toThrow("Department not found");
        });
    });

    describe("getEmployeeById", () => {
        it("should return value when user with proper id exists", async () => {
            when(employeeRepository.findOneById).calledWith(employeeId).mockReturnValue(employee);
            const result = await employeeService.getEmployeeById(employeeId);
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(employeeId);
            expect(result).toStrictEqual(employee);
        });

        it("should throw error when user with proper id does not exists", async () => {
            const arrangeEmployeeId = 1;
            const actEmployeeId = 1;
            when(employeeRepository.findOneById).calledWith(arrangeEmployeeId).mockReturnValue(null);
            expect(employeeService.getEmployeeById(actEmployeeId)).rejects.toThrow("Employee not found");
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(actEmployeeId);
        });
    });


    describe("updateEmployee", () => {
        const updateEmployeeFn = jest.fn(() => employeeService.updateEmployee(
            employeeId,
            employee.email,   
            employee.name,
            employee.age,
            mockAddressDto,
            employee.password,
            employee.role,
            departmentId,
            employee.employeeId,
            employee.dateOfJoining,
            employee.experience,
            employee.status
        ));

        it("should update the employee if employee with given id exists", async () => {
            when(employeeRepository.findOneById).calledWith(employeeId).mockReturnValue(employee);
            when(departmentService.getDepartmentById).calledWith(departmentId).mockReturnValue(employee.department);
            await updateEmployeeFn();
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(employeeId);
            expect(departmentService.getDepartmentById).toHaveBeenCalledWith(departmentId);
            expect(employeeRepository.update).toHaveBeenCalledWith(employeeId, employee);
        });

        it("should throw an error if employee with given id doesnot exists", async () => {
            when(employeeRepository.findOneById).calledWith(employeeId).mockReturnValue(null);
            expect(updateEmployeeFn()).rejects.toThrow("Employee doesnot exists");
            expect(employeeRepository.update).not.toHaveBeenCalled();
        });
        
        it("should throw an error if department with given id doesnot exists", async () => {
            when(employeeRepository.findOneById).calledWith(employeeId).mockReturnValue(employee);
            when(departmentService.getDepartmentById).calledWith(departmentId).mockReturnValue(null);
            expect(updateEmployeeFn()).rejects.toThrow("Department not found");
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(employeeId);
            expect(employeeRepository.update).not.toHaveBeenCalled();
        });
    });

    describe("deleteEmployee", () => {
        it("should delete the employee if employee with given id exists", async () => {
            when(employeeRepository.findOneById).calledWith(employeeId).mockReturnValue(employee);
            await employeeService.deleteEmployee(employeeId);
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(employeeId);
            expect(employeeRepository.delete).toHaveBeenCalledWith(employee);
        });

        it("should throw an error if employee with given id doesnot exists", async () => {
            when(employeeRepository.findOneById).calledWith(employeeId).mockReturnValue(null);
            expect(employeeService.deleteEmployee(employeeId)).rejects.toThrow("Employee not found");
            expect(employeeRepository.delete).not.toHaveBeenCalled();
        });
    });
});