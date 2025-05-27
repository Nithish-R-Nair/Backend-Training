import { when } from "jest-when";
import { mock, MockProxy } from 'jest-mock-extended';
import DepartmentRepository from "../../repositories/department.repository"
import DepartmentService from "../../services/department.service";
import Department from "../../entities/department.entity";

describe("DepartmentService", () => {
    let departmentRepository: MockProxy<DepartmentRepository>;
    let departmentService: DepartmentService;
    let mockDepartment: Department;
    let departmentName: string;
    let departmentId: number;
    
    beforeEach(() => {
        departmentRepository = mock<DepartmentRepository>();
        departmentService = new DepartmentService(departmentRepository);
        departmentName = "department";
        departmentId = 1;
        mockDepartment = new Department();
        mockDepartment.name = departmentName;
    });
    
    describe("createDepartment", () => {
        it("should create and return a department on success", async () => {
            when(departmentRepository.create).calledWith(mockDepartment).mockResolvedValue(mockDepartment);
            const department: Department = await departmentService.createDepartment(departmentName);
            expect(departmentRepository.create).toHaveBeenCalledWith(department);
            expect(mockDepartment).toEqual(department);
        });

        it("should throw an error on failure", async () => {
            when(departmentRepository.create).calledWith(mockDepartment).mockReturnValue(null);
            expect(departmentService.createDepartment(departmentName)).rejects.toThrow("Department cannot be created");
            expect(departmentRepository.create).toHaveBeenCalledWith(mockDepartment);
        });
    });

    describe("getDepartmentById", () => {
        it("should return the department if depatment with given id exists", async () => {
            when(departmentRepository.findOneById).calledWith(departmentId).mockResolvedValue(mockDepartment);
            const department: Department = await departmentService.getDepartmentById(departmentId);
            expect(departmentRepository.findOneById).toHaveBeenCalledWith(departmentId);
            expect(mockDepartment).toEqual(department);
        });

        it("should throw an error if department with given id doesnot exists", async () => {
            when(departmentRepository.create).calledWith(mockDepartment).mockReturnValue(null);
            expect(departmentService.getDepartmentById(departmentId)).rejects.toThrow("Department not found");
            expect(departmentRepository.findOneById).toHaveBeenCalledWith(departmentId);
        });
    });

    describe("updateDepartment", () => {
        it("should call repository update function when the depratment to update exists", async () => {
            when(departmentRepository.findOneById).calledWith(departmentId).mockReturnValue(mockDepartment);
            await departmentService.updateDepartment(departmentId, departmentName);
            expect(departmentRepository.findOneById).toHaveBeenCalledWith(departmentId);
            expect(departmentRepository.update).toHaveBeenCalledWith(departmentId, mockDepartment);
        });

        it("should throw error is the department to update doesnot exist", async () => {
            when(departmentRepository.findOneById).calledWith(departmentId).mockReturnValue(null);
            expect(departmentService.updateDepartment(departmentId, departmentName)).rejects.toThrow("Department not found");
            expect(departmentRepository.findOneById).toHaveBeenCalledWith(departmentId);
            expect(departmentRepository.update).not.toHaveBeenCalled();
        });
    });

    describe("deleteDepartment", () => {
        it("should call repository delete function when the depratment to delete exists", async () => {
            when(departmentRepository.findOneById).calledWith(departmentId).mockReturnValue(mockDepartment);
            await departmentService.deleteDepartment(departmentId);
            expect(departmentRepository.delete).toHaveBeenCalledWith(mockDepartment);
        });

        it("should throw error is the department to delete doesnot exist", async () => {
            when(departmentRepository.findOneById).calledWith(departmentId).mockReturnValue(null);
            expect(departmentService.updateDepartment(departmentId, departmentName)).rejects.toThrow("Department not found");
            expect(departmentRepository.findOneById).toHaveBeenCalledWith(departmentId);
            expect(departmentRepository.delete).not.toHaveBeenCalled();
        });
    });
});