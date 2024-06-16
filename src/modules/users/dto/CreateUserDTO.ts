import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export default class CreateUserDTO {
  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  userName: string;
}
