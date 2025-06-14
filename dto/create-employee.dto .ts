import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import { Column } from "typeorm";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole

  @IsNumber()
  departmentId: number;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsDate()
  @Type(() => Date)
  dateOfJoining: Date;

  @IsNumber()
  experience: number;

  @IsEnum(EmployeeStatus)
  status: EmployeeStatus;
}