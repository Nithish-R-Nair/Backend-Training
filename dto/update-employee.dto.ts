import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";

export class UpdateEmployeeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(EmployeeRole)
  @IsNotEmpty()
  role: EmployeeRole

  @IsNumber()
  departmentId: number;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dateOfJoining: Date;

  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @IsEnum(EmployeeStatus)
  @IsNotEmpty()
  status: EmployeeStatus;
}