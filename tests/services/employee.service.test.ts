import { AirbagService, CrashSensor, AirbagIgniter, AirbagResult } from '../../services/airbag.service';
import { when } from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended';
import EmployeeRepository from "../../repositories/employee.repository";
import EmployeeService from "../../services/employee.service";
import Employee from "../../entities/employee.entity";


describe("EmployeeService", () => {

    let employeeRepository: MockProxy<EmployeeRepository>;
    let employeeService: EmployeeService;
    
    beforeEach(() => {
        employeeRepository = mock<EmployeeRepository>();
        employeeService = new EmployeeService(employeeRepository);
    });


    describe("getEmployeeById", () => {
        
        it("should return value when user with proper id exists", async () => {
            const mockEmployee = { id: 1, name: "EMP name", email: "emp@gmail.com" } as Employee;

            when(employeeRepository.findOneById).calledWith(mockEmployee.id).mockReturnValue(mockEmployee);

            const result = await employeeService.getEmployeeById(mockEmployee.id);
            
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(mockEmployee.id);
            expect(result).toStrictEqual(mockEmployee);
        });

        it("should throw error when user with proper id does not exists", async () => {
            const arrangeEmployeeId = 1;
            const actEmployeeId = 1;

            when(employeeRepository.findOneById).calledWith(arrangeEmployeeId).mockReturnValue(null);

            expect(employeeService.getEmployeeById(actEmployeeId)).rejects.toThrow("Employee not found");
            expect(employeeRepository.findOneById).toHaveBeenCalledWith(actEmployeeId);
        });

    });

});