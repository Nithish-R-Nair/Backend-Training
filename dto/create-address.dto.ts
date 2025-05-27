import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  houseNo: string;

  @IsString()
  @IsNotEmpty()
  line1: string;

  @IsString()
  @IsNotEmpty()
  line2: string;

  @IsString()
  @IsNotEmpty()
  pincode: string;
}